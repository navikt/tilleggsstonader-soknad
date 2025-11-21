import express, { Request, Response, Router } from 'express';
import path from 'path';

import { applyCspDirectives, logCspViolation } from './csp';
import { getDecoratedHtml } from './decorator';
import logger from './logger';
import { miljø } from './miljø';
import { addRequestInfo, doProxy } from './proxy';
import attachToken from './tokenProxy';
import { matchAllPathsExcluding } from './utils';

const buildPath = path.resolve(process.cwd(), '../../app/build');
const BASE_PATH = '/tilleggsstonader';
const BASE_PATH_SOKNAD = `${BASE_PATH}/soknad`;

const routes = () => {
    const expressRouter = Router();

    expressRouter.get(
        [`${BASE_PATH_SOKNAD}/internal/isAlive`, `${BASE_PATH_SOKNAD}/internal/isReady`],
        (req, res) => {
            res.sendStatus(200);
            return;
        }
    );

    expressRouter.use(BASE_PATH_SOKNAD, express.static(buildPath, { index: false }));

    // Ruter for sider som kun gjør umiddelbar redirect, uten nav-dekoratør
    // Dette unngår at vi sender unødvendig javascript til brukerne våre, og vi slipper Skyra/dekoratør-støy i Sentry
    const udekorerteRuter = [
        new RegExp(`^${BASE_PATH_SOKNAD}/boutgifter/?$`),
        new RegExp(`^${BASE_PATH_SOKNAD}/daglig-reise/?$`),
    ];
    expressRouter.get(udekorerteRuter, applyCspDirectives, sendUdekorertHtml);

    expressRouter.use(
        matchAllPathsExcluding('internal', 'static', 'api', 'reporting'),
        applyCspDirectives,
        sendHtmlMedDekoratør
    );

    expressRouter.use(
        `${BASE_PATH_SOKNAD}/api/vedlegg`,
        addRequestInfo(),
        attachToken('familie-dokument'),
        doProxy(miljø.vedleggUrl, true)
    );

    expressRouter.use(
        `${BASE_PATH_SOKNAD}/api`,
        addRequestInfo(),
        attachToken('tilleggsstonader-soknad-api'),
        doProxy(miljø.apiUrl)
    );

    expressRouter.post(
        `${BASE_PATH_SOKNAD}/reporting/csp-violation`,
        express.json({ type: 'application/reports+json' }),
        logCspViolation
    );

    return expressRouter;
};

async function sendHtmlMedDekoratør(_req: Request, res: Response) {
    getDecoratedHtml(path.join(buildPath, 'index.html'))
        .then((html) => {
            res.send(html);
        })
        .catch((e) => {
            logger.error(e);
            res.status(500).send(e);
        });
}

/**
 * Sender ren index.html uten nav-dekoratør.
 * Brukes for ruter som kun gjør umiddelbar redirect (f.eks. boutgifter, daglig-reise),
 * for å unngå Skyra/dekoratør-støy i Sentry.
 */
function sendUdekorertHtml(_req: Request, res: Response) {
    res.sendFile(path.join(buildPath, 'index.html'));
}

export default routes;
