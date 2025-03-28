import { NextFunction, Request, RequestHandler, Response } from 'express';

import { logWarn, logInfo } from './logger';
import TokenXClient from './tokenx';

const { exchangeToken } = new TokenXClient();

export type ApplicationName = 'tilleggsstonader-soknad-api' | 'familie-dokument';

const AUTHORIZATION_HEADER = 'authorization';
const WONDERWALL_ID_TOKEN_HEADER = 'x-wonderwall-id-token';

const attachToken = (applicationName: ApplicationName): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authenticationHeader = await prepareSecuredRequest(req, applicationName);
            req.headers[AUTHORIZATION_HEADER] = authenticationHeader.authorization;
            req.headers[WONDERWALL_ID_TOKEN_HEADER] = '';
            next();
        } catch (error) {
            logWarn(
                `Noe gikk galt ved setting av token (${req.method} - ${req.path}): `,
                req,
                error
            );
            res.status(401).send('En uventet feil oppstod. Ingen gyldig token');
            return;
        }
    };
};

const erLokalt = () => {
    return process.env.ENV === 'localhost';
};

const harBearerToken = (authorization: string) => {
    return authorization.includes('Bearer ');
};

const utledToken = (req: Request, authorization: string | undefined) => {
    if (erLokalt()) {
        return req.cookies['localhost-idtoken'];
    } else if (authorization && harBearerToken(authorization)) {
        return authorization.split(' ')[1];
    } else {
        throw Error('Mangler authorization i header');
    }
};

const prepareSecuredRequest = async (req: Request, applicationName: ApplicationName) => {
    logInfo('PrepareSecuredRequest', req);
    const { authorization } = req.headers;
    const token = utledToken(req, authorization);
    logInfo('IdPorten-token found: ' + (token.length > 1), req);
    const accessToken = await exchangeToken(token, applicationName).then(
        (accessToken) => accessToken
    );
    logInfo('PrepareSecuredRequest done', req);
    return {
        authorization: `Bearer ${accessToken}`,
    };
};

export default attachToken;
