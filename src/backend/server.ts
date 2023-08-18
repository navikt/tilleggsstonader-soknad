import express from 'express';

import cookieParser from 'cookie-parser';
import routes from "./routes";
const app = express();

if (process.env.ENV === 'localhost') {
    app.use(cookieParser());
}

app.use(routes());

app.listen(3000);
