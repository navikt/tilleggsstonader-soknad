import { Stønadstype } from '../typer/stønadstyper';

interface EnvironmentProps {
    apiProxyUrl: string;
    vedleggProxyUrl: string;
    wonderwallUrl: string;
    logoutUrl: string;
    sentryUrl?: string;
    urlGammelSøknad: (stønadstype: Stønadstype) => string;
    urlPapirsøknad: (stønadstype: Stønadstype) => string;
    miljø: string;
    modellVersjon: IModellversjon;
}

interface IModellversjon {
    barnetilsyn: number;
}

const StønadstypeTilFyllutSkjema: Record<Stønadstype, string> = {
    BARNETILSYN: 'nav111215b',
    LÆREMIDLER: 'nav111216b',
};

const urlGammelSøknadProd = (stønadstype: Stønadstype) =>
    `https://www.nav.no/fyllut/${StønadstypeTilFyllutSkjema[stønadstype]}?sub=digital`;

const urlGammelSøknadDev = (stønadstype: Stønadstype) =>
    `https://skjemadelingslenke.ekstern.dev.nav.no/fyllut/${StønadstypeTilFyllutSkjema[stønadstype]}?sub=digital`;

const urlPapirsøknadProd = (stønadstype: Stønadstype) =>
    `https://www.nav.no/fyllut/${StønadstypeTilFyllutSkjema[stønadstype]}?sub=paper`;

const urlPapirsøknadDev = (stønadstype: Stønadstype) =>
    `https://skjemadelingslenke.ekstern.dev.nav.no/fyllut/${StønadstypeTilFyllutSkjema[stønadstype]}?sub=paper`;

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
            urlGammelSøknad: urlGammelSøknadDev,
            urlPapirsøknad: urlPapirsøknadDev,
            miljø: 'preprod',
            modellVersjon: modellVersjon,
        };
    } else if (window.location.hostname.indexOf('nav.no') > -1) {
        return {
            apiProxyUrl: 'https://www.nav.no/tilleggsstonader/soknad/api',
            vedleggProxyUrl: 'https://www.nav.no/tilleggsstonader/soknad/api/vedlegg',
            wonderwallUrl: 'https://www.nav.no/tilleggsstonader/soknad/oauth2',
            logoutUrl: 'https://login.nav.no/oauth2/logout',
            sentryUrl: 'https://06b839ad5487467cb88097c5a27bbbb5@sentry.gc.nav.no/167',
            urlGammelSøknad: urlGammelSøknadProd,
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
            urlGammelSøknad: urlGammelSøknadDev,
            urlPapirsøknad: urlPapirsøknadDev,
            miljø: 'local',
            modellVersjon: modellVersjon,
        };
    }
};

export default Environment;
