import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';

import { logger } from './logger';

export function getDecoratedHtml(path: string) {
    const env = process.env.ENV;

    if (env === undefined) {
        logger.error('Mangler miljø for dekoratøren');
    }

    // Dekoratøren krever `localUrl` når env er 'localhost' - se
    // https://github.com/navikt/nav-dekoratoren#starte-dekoratøren-lokalt
    const envProps =
        env === 'localhost'
            ? {
                  env: 'localhost' as const,
                  localUrl: process.env.DECORATOR_URL ?? 'http://localhost:8089',
              }
            : { env: (env === 'prod' ? 'prod' : 'dev') as 'dev' | 'prod' };

    return injectDecoratorServerSide({
        ...envProps,
        filePath: path,
        params: {
            simple: true,
            redirectToApp: true,
            level: 'Level4',
        },
    });
}
