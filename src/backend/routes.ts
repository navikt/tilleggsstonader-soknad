import express from 'express';
import path from 'path';

const buildPath = path.resolve(process.cwd(), '../build');
const BASE_PATH = '/tilleggsstonader';
const BASE_PATH_SOKNAD = `${BASE_PATH}/soknad`;
const routes = () => {
    const expressRouter = express.Router();

    expressRouter.get(`${BASE_PATH_SOKNAD}/internal/isAlive|isReady`, (req, res) =>
        res.sendStatus(200)
    );

    expressRouter.use(BASE_PATH_SOKNAD, express.static(buildPath, { index: false }));

    expressRouter.use(
        /^(?!.*\/(internal|static|api)\/).*$/,
        express.static(buildPath, { index: true })
    );

    return expressRouter;
};

export default routes;
