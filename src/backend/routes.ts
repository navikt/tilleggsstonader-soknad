import express from 'express';
import { Request, Response, Router } from 'express';
import path from 'path';

const buildPath = path.resolve(process.cwd(), '../dist_production');
const BASE_PATH = '/tilleggsstonader';
const BASE_PATH_SOKNAD = `${BASE_PATH}/soknad`;
const routes = () => {
    const expressRouter = Router();

    expressRouter.get(`${BASE_PATH_SOKNAD}/internal/isAlive|isReady`, (req, res) =>
        res.sendStatus(200)
    );

    expressRouter.use(BASE_PATH_SOKNAD, express.static(buildPath, { index: false }));

    expressRouter.use(/^(?!.*\/(internal|static|api)\/).*$/, (_req: Request, res: Response) => {
        res.sendFile('index.html', { root: 'dist_development' });
    });

    return expressRouter;
};

export default routes;
