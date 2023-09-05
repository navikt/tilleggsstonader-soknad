import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import Environment from './Environment';

export const initSentry = () => {
    const env = Environment();
    if (env.sentryUrl) {
        Sentry.init({
            dsn: env.sentryUrl,
            release: process.env.COMMIT_HASH,
            environment: env.miljø,
            integrations: [new BrowserTracing()],
        });
    }
};
