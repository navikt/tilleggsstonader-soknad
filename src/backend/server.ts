import cookieParser from 'cookie-parser';
import express from 'express';

import { cspDirective } from './csp';
import logger from './logger';
import routes from './routes';
import { ekskluderStier } from './utils';

const app = express();

if (process.env.ENV === 'localhost') {
    app.use(cookieParser());
}
app.use(ekskluderStier('internal', 'static', 'api'), cspDirective());
app.use(routes());

const PORT = 3000;
logger.info(`Starter server på port ${PORT}`);
app.listen(PORT);
