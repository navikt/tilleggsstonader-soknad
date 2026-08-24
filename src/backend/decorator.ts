import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';

import { logger } from './logger';

const telemetryCollectorUrl: Record<string, string> = {
    dev: 'https://telemetry.ekstern.dev.nav.no/collect',
    prod: 'https://telemetry.nav.no/collect',
};

function injectApmMetaTags(html: string, env: string): string {
    const collectorUrl = telemetryCollectorUrl[env];
    if (!collectorUrl) return html;

    const metaTags = [
        `<meta name="nais-app" content="tilleggsstonader-soknad">`,
        `<meta name="nais-team" content="tilleggsstonader">`,
        `<meta name="nais-telemetry-url" content="${collectorUrl}">`,
        `<meta name="nais-version" content="${process.env.APP_VERSION ?? 'unknown'}">`,
    ].join('\n    ');

    return html.replace('<head>', `<head>\n    ${metaTags}`);
}

export async function getDecoratedHtml(path: string) {
    const env = process.env.ENV;

    if (env === undefined) {
        logger.error('Mangler miljø for dekoratøren');
    }

    const html = await injectDecoratorServerSide({
        env: env as 'dev' | 'prod',
        filePath: path,
        params: {
            simple: true,
            redirectToApp: true,
            level: 'Level4',
        },
    });

    return injectApmMetaTags(html, env ?? '');
}
