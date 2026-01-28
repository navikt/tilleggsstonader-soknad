import { NextFunction, Request, Response } from 'express';

import { DEV_CSP, PROD_CSP } from './generated/csp-headers.js';
import logger from './logger';
import { miljø } from './miljø';

const rapporteringsendepunkt = `${miljø.reportingUrl}/csp-violation`;

function getCspString(): string {
    const env = process.env.ENV;
    return env === 'localhost' ? DEV_CSP : PROD_CSP;
}

export async function applyCspDirectives(_: Request, res: Response, next: NextFunction) {
    res.header('Content-Security-Policy-Report-Only', getCspString() + '; report-to csp-violation');
    res.header('Reporting-Endpoints', `csp-violation="${rapporteringsendepunkt}"`);
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
