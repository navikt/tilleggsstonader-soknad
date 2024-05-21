import * as Sentry from '@sentry/react';

import Environment from './Environment';

export const initSentry = () => {
    const env = Environment();
    if (env.sentryUrl) {
        Sentry.init({
            dsn: env.sentryUrl,
            release: process.env.COMMIT_HASH,
            environment: env.miljø,
            integrations: [Sentry.browserTracingIntegration()],
        });
    }
};
