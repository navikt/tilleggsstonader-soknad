interface EnvironmentProps {
    apiProxyUrl: string;
    wonderwallUrl: string;
    sentryUrl?: string;
    miljø: string;
    modellVersjon: IModellversjon;
}

interface IModellversjon {
    barnetilsyn: number;
}

const Environment = (): EnvironmentProps => {
    const modellVersjon = { overgangsstønad: 7, barnetilsyn: 2, skolepenger: 2 };

    if (window.location.hostname.indexOf('dev.nav.no') > -1) {
        return {
            apiProxyUrl: 'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad/api',
            wonderwallUrl:
                'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad/oauth2/login?redirect=',
            sentryUrl: 'https://88f5ed8ed0fc42139eaf7061abfedb19@sentry.gc.nav.no/36',
            miljø: 'preprod',
            modellVersjon: modellVersjon,
        };
    } else if (window.location.hostname.indexOf('www') > -1) {
        return {
            apiProxyUrl: 'https://www.nav.no/tilleggsstonader/soknad/api',
            wonderwallUrl: 'https://www.nav.no/tilleggsstonader/soknad/oauth2/login?redirect=',
            sentryUrl: 'https://88f5ed8ed0fc42139eaf7061abfedb19@sentry.gc.nav.no/36',
            miljø: 'production',
            modellVersjon: modellVersjon,
        };
    } else {
        return {
            apiProxyUrl: 'http://localhost:8080/api',
            wonderwallUrl: `http://localhost:8001/test/cookie?redirect=`,
            miljø: 'local',
            modellVersjon: modellVersjon,
        };
    }
};

export default Environment;
