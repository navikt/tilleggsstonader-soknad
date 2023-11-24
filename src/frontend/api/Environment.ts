interface EnvironmentProps {
    apiProxyUrl: string;
    vedleggProxyUrl: string;
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
            vedleggProxyUrl:
                'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad/vedlegg',
            wonderwallUrl:
                'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad/oauth2/login?redirect=',
            sentryUrl: 'https://06b839ad5487467cb88097c5a27bbbb5@sentry.gc.nav.no/167',
            miljø: 'preprod',
            modellVersjon: modellVersjon,
        };
    } else if (window.location.hostname.indexOf('www') > -1) {
        return {
            apiProxyUrl: 'https://www.nav.no/tilleggsstonader/soknad/api',
            vedleggProxyUrl: 'https://www.nav.no/tilleggsstonader/soknad/vedlegg',
            wonderwallUrl: 'https://www.nav.no/tilleggsstonader/soknad/oauth2/login?redirect=',
            sentryUrl: 'https://06b839ad5487467cb88097c5a27bbbb5@sentry.gc.nav.no/167',
            miljø: 'production',
            modellVersjon: modellVersjon,
        };
    } else {
        return {
            apiProxyUrl: 'http://localhost:8080/api',
            vedleggProxyUrl: 'http://localhost:8080/api/vedlegg/tillegg',
            wonderwallUrl: `http://localhost:8001/test/cookie?redirect=`,
            miljø: 'local',
            modellVersjon: modellVersjon,
        };
    }
};

export default Environment;
