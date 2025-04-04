import { Stønadstype, StønadstypeRouting } from '../typer/stønadstyper';

interface EnvironmentProps {
    apiProxyUrl: string;
    vedleggProxyUrl: string;
    wonderwallUrl: string;
    logoutUrl: string;
    sentryUrl?: string;
    urlPapirsøknad: (stønadstype: Stønadstype) => string;
    urlGammelSøknad: (stønadstype: StønadstypeRouting) => string;
    urlNyFyllUtSøknad: (stønadstype: StønadstypeRouting) => string;
    miljø: 'local' | 'preprod' | 'production';
    modellVersjon: IModellversjon;
}

interface IModellversjon {
    barnetilsyn: number;
}

const StønadstypeTilGammeltFyllUtSkjema: Record<StønadstypeRouting, string> = {
    BOUTGIFTER: 'nav111219b',
};

const StønadstypeTilNyttFyllUtSkjema: Record<StønadstypeRouting, string | undefined> = {
    BOUTGIFTER: 'nav111219',
};

const StønadstypeTilPapirskjema: Record<Stønadstype, string> = {
    BARNETILSYN: 'nav111215b',
    LÆREMIDLER: 'nav111216b',
};

const urlNyFyllUtSendInnSøknadProd = (stønadstype: StønadstypeRouting) => {
    return `https://www.nav.no/fyllut/${StønadstypeTilNyttFyllUtSkjema[stønadstype]}?sub=digital`;
};

const urlNyFyllUtSendInnSøknadDev = (stønadstype: StønadstypeRouting) => {
    return `https://skjemadelingslenke.ekstern.dev.nav.no/fyllut/${StønadstypeTilNyttFyllUtSkjema[stønadstype]}?sub=digital`;
};

const urlGammelSøknadProd = (stønadstype: StønadstypeRouting) =>
    `https://www.nav.no/fyllut/${StønadstypeTilGammeltFyllUtSkjema[stønadstype]}?sub=digital`;

const urlGammelSøknadDev = (stønadstype: StønadstypeRouting) =>
    `https://skjemadelingslenke.ekstern.dev.nav.no/fyllut/${StønadstypeTilGammeltFyllUtSkjema[stønadstype]}?sub=digital`;

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
            urlGammelSøknad: urlGammelSøknadDev,
            urlPapirsøknad: urlPapirsøknadDev,
            urlNyFyllUtSøknad: urlNyFyllUtSendInnSøknadDev,
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
            urlGammelSøknad: urlGammelSøknadProd,
            urlPapirsøknad: urlPapirsøknadProd,
            urlNyFyllUtSøknad: urlNyFyllUtSendInnSøknadProd,
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
            urlNyFyllUtSøknad: urlNyFyllUtSendInnSøknadDev,
            miljø: 'local',
            modellVersjon: modellVersjon,
        };
    }
};

export default Environment;
