import { init } from '@amplitude/analytics-browser';

export const initAmplitude = () => {
    init('default', '', {
        useBatch: true,
        serverUrl: 'https://amplitude.nav.no/collect-auto',
        ingestionMetadata: {
            sourceName: window.location.toString(),
        },
    });
};
