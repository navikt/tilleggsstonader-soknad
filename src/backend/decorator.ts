import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';

import logger from './logger';

export function getDecoratedHtml(path: string) {
    const env = process.env.ENV;

    if (env === undefined) {
        logger.error('Mangler miljø for dekoratøren');
    }

    return injectDecoratorServerSide({
        env: env as 'dev' | 'prod',
        filePath: path,
        params: {
            simple: true,
            redirectToApp: true,
            level: 'Level4',
        },
    });
}
