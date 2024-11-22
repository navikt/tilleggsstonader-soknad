import cookieParser from 'cookie-parser';
import express from 'express';

import { applyCspDirectives } from './csp';
import logger from './logger';
import routes from './routes';

const app = express();

if (process.env.ENV === 'localhost') {
    app.use(cookieParser());
}
app.use(routes());
applyCspDirectives(app);

const PORT = 3000;
logger.info(`Starter server på port ${PORT}`);
app.listen(PORT);
