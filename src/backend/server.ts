import cookieParser from 'cookie-parser';
import express from 'express';

import { cspString } from './csp';
import routes from './routes';

const app = express();

if (process.env.ENV === 'localhost') {
    app.use(cookieParser());
}

app.use((_req, res, next) => {
    // TODO: Bytt til 'Content-Security-Policy' etter at vi har undersøkt loggene etter en ukes tid
    // Vi bør ikke se noen logginnslag av typen "[Report Only] Refused to load <some resource> because..."
    res.header('Content-Security-Policy-Report-Only', cspString());
    next();
});

app.use(routes());

app.listen(3000);
