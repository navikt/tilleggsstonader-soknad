interface EnvironmentProps {
    apiProxyUrl: string;
    vedleggProxyUrl: string;
    wonderwallUrl: string;
    sentryUrl?: string;
    urlGammelSøknad: string;
    miljø: 'local' | 'preprod' | 'production';
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
                'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad/api/vedlegg',
            wonderwallUrl:
                'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad/oauth2/login?redirect=',
            sentryUrl: 'https://06b839ad5487467cb88097c5a27bbbb5@sentry.gc.nav.no/167',
            urlGammelSøknad: 'https://soknad.intern.dev.nav.no/soknadtilleggsstonader',
            miljø: 'preprod',
            modellVersjon: modellVersjon,
        };
    } else if (window.location.hostname.indexOf('www') > -1) {
        return {
            apiProxyUrl: 'https://www.nav.no/tilleggsstonader/soknad/api',
            vedleggProxyUrl: 'https://www.nav.no/tilleggsstonader/soknad/api/vedlegg',
            wonderwallUrl: 'https://www.nav.no/tilleggsstonader/soknad/oauth2/login?redirect=',
            sentryUrl: 'https://06b839ad5487467cb88097c5a27bbbb5@sentry.gc.nav.no/167',
            urlGammelSøknad: 'https://tjenester.nav.no/soknadtilleggsstonader',
            miljø: 'production',
            modellVersjon: modellVersjon,
        };
    } else {
        return {
            apiProxyUrl: 'http://localhost:8080/api',
            vedleggProxyUrl: 'http://localhost:8080/api/vedlegg/tillegg',
            wonderwallUrl: `http://localhost:8001/test/cookie?redirect=`,
            urlGammelSøknad: 'https://soknad.intern.dev.nav.no/soknadtilleggsstonader',
            miljø: 'local',
            modellVersjon: modellVersjon,
        };
    }
};

export default Environment;
