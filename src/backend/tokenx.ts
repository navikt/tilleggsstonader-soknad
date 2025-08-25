import jwt from 'jsonwebtoken';
import nodeJose from 'node-jose';
import { discovery, genericGrantRequest, None } from 'openid-client';
import { v4 as uuid } from 'uuid';

import logger from './logger';
import { miljø } from './miljø';
import { ApplicationName } from './tokenProxy';

const namespace: { [key in ApplicationName]: string } = {
    'familie-dokument': 'teamfamilie',
    'tilleggsstonader-soknad-api': 'tilleggsstonader',
};

/* eslint-disable @typescript-eslint/no-explicit-any */
class TokenXClient {
    private tokenxClient: any = null;
    private audience: any = null;

    constructor() {
        logger.info('Setter opp TokenX');

        this.init()
            .then((client: any) => {
                this.tokenxClient = client;
            })
            .catch(() => process.exit(1));
    }

    exchangeToken = async (idportenToken: any, applicationName: ApplicationName) => {
        const clientAssertion = await this.createClientAssertion();

        return genericGrantRequest(
            this.tokenxClient,
            'urn:ietf:params:oauth:grant-type:token-exchange',
            {
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                client_assertion: clientAssertion,
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                subject_token: idportenToken,
                audience: `${tokenxConfig.clusterName}:${namespace[applicationName]}:${applicationName}`,
            }
        )
            .then((tokenSet: any) => {
                return Promise.resolve(tokenSet.access_token);
            })
            .catch((err: any) => {
                logger.error('Feil under utveksling av token: ', err);
                return Promise.reject(err);
            });
    };

    private createClientAssertion = async () => {
        const now = Math.floor(Date.now() / 1000);

        const payload = {
            sub: tokenxConfig.clientId,
            iss: tokenxConfig.clientId,
            aud: this.audience,
            jti: uuid(),
            nbf: now,
            iat: now,
            exp: now + 60, // max 120
        };

        const key = await this.asKey(tokenxConfig.privateJwk);

        const options: any = {
            algorithm: 'RS256',
            header: {
                kid: key.kid,
                typ: 'JWT',
                alg: 'RS256',
            },
        };

        return jwt.sign(payload, key.toPEM(true), options);
    };

    private asKey = async (jwk: any) => {
        if (!jwk) {
            logger.error('JWK Mangler');
            throw Error('JWK Mangler');
        }

        return nodeJose.JWK.asKey(jwk).then((key: any) => {
            return Promise.resolve(key);
        });
    };

    private init = async () => {
        if (!tokenxConfig.discoveryUrl) {
            logger.error('Mangler miljøvariabel TOKEN_X_WELL_KNOWN_URL');
            throw new TypeError('Miljøvariabelen "TOKEN_X_WELL_KNOWN_URL må være satt');
        }
        const config = await discovery(
            new URL(tokenxConfig.discoveryUrl),
            tokenxConfig.clientId as string,
            { redirect_uris: [tokenxConfig.redirectUri] },
            None()
        );
        this.audience = config.serverMetadata().token_endpoint;

        logger.info(`Discovered TokenX @ ${config.serverMetadata().issuer}`);

        try {
            logger.info('Opprettet TokenX client');
            return Promise.resolve(config);
        } catch (err) {
            logger.error(
                'Feil oppstod under parsing av jwt eller opprettelse av TokenX client',
                err
            );
            return Promise.reject(err);
        }
    };
}

const tokenxConfig = {
    discoveryUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
    clientId: process.env.TOKEN_X_CLIENT_ID,
    privateJwk: process.env.TOKEN_X_PRIVATE_JWK,
    redirectUri: miljø.oauthCallbackUri,
    clusterName: process.env.NAIS_CLUSTER_NAME,
};

export default TokenXClient;
