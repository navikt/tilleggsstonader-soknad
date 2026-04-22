import * as Sentry from '@sentry/react';

import Environment from './Environment';
import appConfig from '../utils/appConfig';

export const initSentry = () => {
    const env = Environment();
    if (env.sentryUrl) {
        Sentry.init({
            dsn: env.sentryUrl,
            release: appConfig.commitHash,
            environment: env.miljø,
            integrations: [Sentry.browserTracingIntegration()],
        });
    }
};
