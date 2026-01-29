import { NextFunction, Request, Response } from 'express';

import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';

import logger from './logger';
import { miljø } from './miljø';

const rapporteringsendepunkt = `${miljø.reportingUrl}/csp-violation`;

const appDirectives = {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'script-src-elem': ["'self'"],
    'style-src': ["'self'"],
    'style-src-elem': ["'self'"],
    'img-src': ["'self'", 'data:'],
    'connect-src': ["'self'", 'm3pb011r.apicdn.sanity.io', 'sentry.gc.nav.no'],
    'font-src': ["'self'"],
};

const CSP_TIMEOUT_MS = 2000;

function getEnv(): 'dev' | 'prod' {
    return process.env.ENV === 'localhost' ? 'dev' : 'prod';
}

export async function applyCspDirectives(_: Request, res: Response, next: NextFunction) {
    try {
        const timeoutPromise = new Promise((_resolve, reject) =>
            setTimeout(
                () => reject(new Error('Timeout ved henting av CSP fra dekoratøren')),
                CSP_TIMEOUT_MS
            )
        );
        const cspHeader = await Promise.race([
            buildCspHeader(appDirectives, { env: getEnv() }),
            timeoutPromise,
        ]);

        res.header('Content-Security-Policy-Report-Only', cspHeader + '; report-to csp-violation');
        res.header('Reporting-Endpoints', `csp-violation="${rapporteringsendepunkt}"`);
    } catch (error) {
        logger.warn('Kunne ikke hente CSP-headere fra dekoratøren. Fortsetter uten CSP.', error);
    }

    next();
}

export function logCspViolation(req: Request, res: Response) {
    const violationReport = Array.isArray(req.body) ? req.body[0] : req.body;
    if (!violationReport) {
        logger.warn('CSP violation with empty payload');
        res.status(204).end();
        return;
    }

    logger.info('Raw CSP violation report', violationReport);

    const { body } = violationReport;
    const blockedURL = body?.blockedURL ?? 'unknown';
    const documentURL = body?.documentURL ?? 'unknown';
    const violatedDirective = body?.violatedDirective ?? 'unknown';
    const sourceFile = body?.sourceFile ?? 'unknown';

    const message = {
        blockedURL,
        documentURL,
        violatedDirective,
        sourceFile,
    };

    logger.warn('CSP violation', message);

    res.status(204).end();
}
