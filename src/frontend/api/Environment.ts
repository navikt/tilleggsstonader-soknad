import { Stønadstype } from '../typer/stønadstyper';

interface EnvironmentProps {
    apiProxyUrl: string;
    vedleggProxyUrl: string;
    wonderwallUrl: string;
    logoutUrl: string;
    sentryUrl?: string;
    urlPapirsøknad: (stønadstype: Stønadstype) => string;
    miljø: 'local' | 'preprod' | 'production';
    modellVersjon: IModellversjon;
}

interface IModellversjon {
    barnetilsyn: number;
}

const StønadstypeTilPapirskjema: Record<Stønadstype, string> = {
    BARNETILSYN: 'nav111215b',
    LÆREMIDLER: 'nav111216b',
};

const urlPapirsøknadProd = (stønadstype: Stønadstype) =>
    `https://www.nav.no/fyllut/${StønadstypeTilPapirskjema[stønadstype]}?sub=paper`;

const urlPapirsøknadDev = (stønadstype: Stønadstype) =>
    `https://skjemadelingslenke.ekstern.dev.nav.no/fyllut/${StønadstypeTilPapirskjema[stønadstype]}?sub=paper`;

const Environment = (): EnvironmentProps => {
    const modellVersjon = { overgangsstønad: 7, barnetilsyn: 2, skolepenger: 2 };

    if (window.location.hostname.indexOf('dev.nav.no') > -1) {
        return {
            apiProxyUrl: 'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad/api',
            vedleggProxyUrl:
                'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad/api/vedlegg',
            wonderwallUrl:
                'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad/oauth2/login?redirect=',
            logoutUrl: 'https://login.ekstern.dev.nav.no/oauth2/logout',
            sentryUrl: 'https://06b839ad5487467cb88097c5a27bbbb5@sentry.gc.nav.no/167',
            urlPapirsøknad: urlPapirsøknadDev,
            miljø: 'preprod',
            modellVersjon: modellVersjon,
        };
    } else if (window.location.hostname.indexOf('nav.no') > -1) {
        return {
            apiProxyUrl: 'https://www.nav.no/tilleggsstonader/soknad/api',
            vedleggProxyUrl: 'https://www.nav.no/tilleggsstonader/soknad/api/vedlegg',
            wonderwallUrl: 'https://www.nav.no/tilleggsstonader/soknad/oauth2/login?redirect=',
            logoutUrl: 'https://login.nav.no/oauth2/logout',
            sentryUrl: 'https://06b839ad5487467cb88097c5a27bbbb5@sentry.gc.nav.no/167',
            urlPapirsøknad: urlPapirsøknadProd,
            miljø: 'production',
            modellVersjon: modellVersjon,
        };
    } else {
        return {
            apiProxyUrl: 'http://localhost:8080/api',
            vedleggProxyUrl: 'http://localhost:8080/api/vedlegg/tillegg',
            wonderwallUrl: `http://localhost:8001/test/cookie?redirect=`,
            logoutUrl: 'http://localhost:8000/oauth2/logout',
            urlPapirsøknad: urlPapirsøknadDev,
            miljø: 'local',
            modellVersjon: modellVersjon,
        };
    }
};

export default Environment;
