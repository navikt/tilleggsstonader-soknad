import express from 'express';
import { Request, Response, Router } from 'express';
import path from 'path';

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
        res.sendFile('index.html', { root: buildPath });
    });

    return expressRouter;
};

export default routes;
