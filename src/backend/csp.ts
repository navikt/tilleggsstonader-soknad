import { NextFunction, Request, Response } from 'express';

import logger from './logger';
import { miljø } from './miljø';

const rapporteringsendepunkt = `${miljø.reportingUrl}/csp-violation`;

export async function applyCspDirectives(_: Request, res: Response, next: NextFunction) {
    res.header('Content-Security-Policy-Report-Only', cspString() + '; report-to csp-violation');
    res.header('Reporting-Endpoints', `csp-violation="${rapporteringsendepunkt}"`);
    next();
}

export function logCspViolation(req: Request, res: Response) {
    const violationReport = extractCspReport(req.body);
    if (!violationReport) {
        logger.warn('CSP violation with empty payload');
        res.status(204).end();
        return;
    }

    const { body, type } = violationReport;
    const blockedURL = body?.blockedURL ?? body?.['csp-report']?.blockedURI ?? 'unknown';
    const documentURL = body?.documentURL ?? body?.['csp-report']?.documentURI ?? 'unknown';
    const violatedDirective =
        body?.violatedDirective ?? body?.['csp-report']?.violatedDirective ?? 'unknown';
    const sourceFile = body?.sourceFile ?? body?.['csp-report']?.sourceFile ?? 'unknown';

    const message = {
        format: type === 'csp-violation' ? 'modern' : 'legacy',
        blockedURL,
        documentURL,
        violatedDirective,
        sourceFile,
    };

    logger.warn('CSP violation', JSON.stringify(message, null, 2));

    res.status(204).end();
}

function extractCspReport(payload: Request['body']) {
    if (!payload) {
        return undefined;
    }

    if (Array.isArray(payload) && payload.length > 0) {
        return payload[0];
    }

    if ('csp-report' in payload) {
        return { body: payload['csp-report'], type: 'legacy' };
    }

    return undefined;
}

const cspMap = (): Record<string, string[]> => {
    return {
        // Hvor vi får hente ressurser fra, hvis ingen andre spesifikke regler gjelder
        'default-src': ["'self'", '*.nav.no'],

        // Hvor vi får hente js-filer fra
        'script-src': [
            "'self'",
            // ┌────────── Dekoratøren ──────────┐
            '*.nav.no',
            'uxsignals-frontend.uxsignals.app.iterate.no',
            '*.psplugin.com',
            '*.taskanalytics.com',
            '*.hotjar.com',
            'nav.boost.ai',
            'survey.skyra.no',
            "'unsafe-inline'",
            '"unsafe-eval"',
            // └────────────────────────────────┘
        ],

        // Hvor vi får hente <script>-elementer fra
        'script-src-elem': [
            "'self'",
            // ┌────────── Dekoratøren ──────────┐
            '*.nav.no',
            'uxsignals-frontend.uxsignals.app.iterate.no',
            '*.psplugin.com',
            '*.hotjar.com',
            '*.taskanalytics.com',
            'nav.boost.ai',
            'survey.skyra.no',
            "'unsafe-inline'",
            // └────────────────────────────────┘
        ],

        // Hvor vi får hente css-filer fra
        'style-src': [
            "'self'",
            // ┌────────── Dekoratøren ──────────┐
            '*.nav.no',
            '*.psplugin.com',
            '*.googleapis.com',
            '*.gstatic.com',
            "'unsafe-inline'",
            // └────────────────────────────────┘
        ],

        // Hvor vi får hente <style>-elementer fra
        'style-src-elem': [
            "'self'",
            // ┌────────── Dekoratøren ──────────┐
            '*.nav.no',
            '*.psplugin.com',
            '*.googleapis.com',
            '*.gstatic.com',
            "'unsafe-inline'",
            // └────────────────────────────────┘
        ],

        // Hvor vi får kjøre XHR/REST-kall mot
        'connect-src': [
            "'self'",
            'm3pb011r.apicdn.sanity.io',
            'sentry.gc.nav.no',
            // ┌────────── Dekoratøren ──────────┐
            '*.nav.no',
            'api.uxsignals.com',
            '*.boost.ai',
            '*.psplugin.com',
            '*.hotjar.com',
            '*.hotjar.io',
            '*.taskanalytics.com',
            // └────────────────────────────────┘
        ],

        // Hvor vi får sende inn forms
        'form-action': ["'self'"],

        // Hvor fonter kan hentes fra
        'font-src': [
            "'self'",
            // ┌────────── Dekoratøren ──────────┐
            '*.psplugin.com',
            '*.hotjar.com',
            'cdn.nav.no',
            '*.googleapis.com',
            '*.gstatic.com',
            'data:', // Tillater innebygde fonter
            // └────────────────────────────────┘
        ],

        // Hvor vi hente innhold til iFrames fra
        'frame-src': [
            // ┌────────── Dekoratøren ──────────┐
            '*.hotjar.com',
            'video.qbrick.com',
            'player.vimeo.com',
            '*.nav.no',
            // └────────────────────────────────┘
        ],

        // Hvor bilder kan hentes fra
        'img-src': [
            "'self'",
            'data:', // Tillater innebygde bilder
            // ┌────────── Dekoratøren ──────────┐
            '*.nav.no',
            'uxsignals-frontend.uxsignals.app.iterate.no',
            '*.psplugin.com',
            '*.vimeocdn.com',
            '*.hotjar.com',
            'www.vergic.com',
            // └────────────────────────────────┘
        ],

        // Hvor web workers kan kjøres fra
        'worker-src': ['*.nav.no', 'blob:'],

        // Hvor child-browsing-kontekster kan kjøres fra, som iFrames eller pop-ups
        'child-src': ['*.nav.no', 'blob:'],

        // Hvor manifest-filer kan hentes fra
        'manifest-src': ["'self'", 'cdn.nav.no', 'oidc-ver2.difi.no', 'idporten-ver2.difi.no'],

        // Hvor denne siden kan integreres (f.eks. iFrames)
        'frame-ancestors': ["'self'", '*.psplugin.com'],
    };
};

const cspString = () => {
    return Object.entries(cspMap())
        .map((entry) => `${entry[0]} ${entry[1].join(' ')}`)
        .join('; ');
};
