import cookieParser from 'cookie-parser';
import express from 'express';

import { csp } from './csp';
import logger from './logger';
import routes from './routes';

const app = express();

if (process.env.ENV === 'localhost') {
    app.use(cookieParser());
}
app.use(routes());
app.use(csp());

logger.info('Starter server på port 3000');

app.listen(3000);
