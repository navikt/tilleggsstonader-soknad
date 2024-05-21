import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ClientRequest, IncomingMessage } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as querystring from 'querystring';
import { v4 as uuid } from 'uuid';

import logger from './logger';

const restream = (proxyReq: ClientRequest, req: IncomingMessage) => {
    const requestBody = (req as Request).body;
    if (requestBody) {
        const contentType = proxyReq.getHeader('Content-Type');

        let bodyData;

        if (contentType === 'application/json') {
            bodyData = JSON.stringify(requestBody);
        }

        if (contentType === 'application/x-www-form-urlencoded') {
            bodyData = querystring.stringify(requestBody);
        }

        if (bodyData) {
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    }
};

export const doProxy = (targetUrl: string): RequestHandler => {
    return createProxyMiddleware({
        changeOrigin: true,
        logger: logger,
        on: {
            proxyReq: restream,
        },
        secure: true,
        target: `${targetUrl}`,
    });
};

export const addRequestInfo = (): RequestHandler => {
    return (req: Request, _res: Response, next: NextFunction) => {
        req.headers['Nav-Consumer-Id'] = 'tilleggsstonader-soknad';
        req.headers['nav-call-id'] = req.headers['x-correlation-id'] ?? uuid();
        next();
    };
};
