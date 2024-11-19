import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import { cspString } from './csp';
import logger from './logger';
import routes from './routes';

const app = express();

if (process.env.ENV === 'localhost') {
    app.use(cookieParser());
}

app.use((_req, res, next) => {
    // TODO: Fjern '-Report-Only' etter at vi har undersøkt loggene etter en ukes tid
    res.header(
        'Content-Security-Policy-Report-Only',
        cspString() + ' report-uri /csp-violation-report'
    );
    next();
});

app.use(bodyParser.json());
app.post('/csp-violation-report', (req, res) => {
    const cspReport = req.body['csp-report'];

    if (cspReport) {
        logger.warning('CSP Violation:', cspReport);
    } else {
        logger.error('Received a malformed CSP violation report.');
    }
    res.status(204).end();
});

app.use(routes());

app.listen(3000);
