import express, { Request, Response, Router } from 'express';
import path from 'path';

import { applyCspDirectives, logCspViolation } from './csp';
import { getDecoratedHtml } from './decorator';
import { getFyllutUrl, SkjematypeFyllUt } from './fyllutUrls';
import logger from './logger';
import { miljø } from './miljø';
import { addRequestInfo, doProxy } from './proxy';
import { redirectTilSkjema } from './redirectTilSkjema';
import attachToken from './tokenProxy';
import { BASE_PATH_SOKNAD } from './url';
import { matchAllPathsExcluding } from './utils';

const buildPath = path.resolve(process.cwd(), '../../app/build');

const routes = () => {
    const expressRouter = Router();

    expressRouter.get(
        [`${BASE_PATH_SOKNAD}/internal/isAlive`, `${BASE_PATH_SOKNAD}/internal/isReady`],
        (_, res) => {
            res.sendStatus(200);
            return;
        }
    );

    expressRouter.get(
        new RegExp(`^${BASE_PATH_SOKNAD}/boutgifter/?$`),
        addRequestInfo(),
        attachToken('tilleggsstonader-soknad-api'),
        redirectTilSkjema(SkjematypeFyllUt.SØKNAD_BOUTGIFTER)
    );

    expressRouter.get(
        new RegExp(`^${BASE_PATH_SOKNAD}/daglig-reise/?$`),
        addRequestInfo(),
        attachToken('tilleggsstonader-soknad-api'),
        redirectTilSkjema(SkjematypeFyllUt.SØKNAD_DAGLIG_REISE, 'daglig-reise/skjema')
    );

    expressRouter.use(BASE_PATH_SOKNAD, express.static(buildPath, { index: false }));

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

    expressRouter.post(
        `${BASE_PATH_SOKNAD}/api/fyllut-redirect`,
        express.json(),
        addRequestInfo(),
        async (req: Request, res: Response) => {
            const { skjematype, versjon } = req.body;
            if (!skjematype) {
                res.status(400).json({ error: 'Mangler skjematype' });
                return;
            }
            const redirectUrl = getFyllutUrl(skjematype, versjon);
            res.json({ redirectUrl });
        }
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

export default routes;
