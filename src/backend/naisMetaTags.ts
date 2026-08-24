import { NextFunction, Request, Response } from 'express';

const buildMetaTags = (): string => {
    const app = process.env.NAIS_APP_NAME ?? '';
    const team = process.env.NAIS_NAMESPACE ?? '';
    const cluster = process.env.NAIS_CLUSTER_NAME ?? '';

    if (!app && !team) return '';

    return [
        app ? `<meta name="nais-app" content="${app}">` : '',
        team ? `<meta name="nais-team" content="${team}">` : '',
        cluster ? `<meta name="nais-cluster" content="${cluster}">` : '',
    ]
        .filter(Boolean)
        .join('\n    ');
};

export const injectNaisMetaTags = (_req: Request, res: Response, next: NextFunction) => {
    const metaTags = buildMetaTags();
    if (!metaTags) return next();

    const originalSend = res.send.bind(res);
    res.send = (body: unknown) => {
        if (typeof body === 'string' && body.includes('<head>')) {
            body = body.replace('<head>', `<head>\n    ${metaTags}`);
        }
        return originalSend(body);
    };

    next();
};
