import express from 'express';
import { Request, Response, Router } from 'express';
import path from 'path';

import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';

import logger from './logger';
import { miljø } from './miljø';
import { addRequestInfo, doProxy } from './proxy';
import attachToken from './tokenProxy';

const buildPath = path.resolve(process.cwd(), '../../app/build');
const BASE_PATH = '/tilleggsstonader';
const BASE_PATH_SOKNAD = `${BASE_PATH}/soknad`;
const routes = () => {
    const expressRouter = Router();

    expressRouter.get(`${BASE_PATH_SOKNAD}/internal/isAlive|isReady`, (req, res) =>
        res.sendStatus(200)
    );

    expressRouter.use(BASE_PATH_SOKNAD, express.static(buildPath, { index: false }));

    expressRouter.use(/^(?!.*\/(internal|static|api)\/).*$/, (_req: Request, res: Response) => {
        getDecoratedHtml(path.join(buildPath, 'index.html'))
            .then((html) => {
                res.send(html);
            })
            .catch((e) => {
                logger.error(e);
                res.status(500).send(e);
            });
    });

    expressRouter.use(
        `${BASE_PATH_SOKNAD}/api`,
        addRequestInfo(),
        attachToken('tilleggsstonader-soknad-api'),
        doProxy(miljø.apiUrl, `${BASE_PATH_SOKNAD}/api`)
    );

    return expressRouter;
};

const getDecoratedHtml = (path: string) => {
    const env = process.env.ENV;

    if (env === undefined) {
        logger.error('Mangler miljø for dekoratøren');
    }

    return injectDecoratorServerSide({
        env: env as 'dev' | 'prod',
        filePath: path,
        params: {
            simple: true,
            enforceLogin: false,
            redirectToApp: true,
            level: 'Level4',
        },
    });
};

export default routes;
