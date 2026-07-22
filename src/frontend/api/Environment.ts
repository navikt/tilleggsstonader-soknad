import { Skjematype } from '../typer/skjematyper';

interface EnvironmentProps {
    apiProxyUrl: string;
    vedleggProxyUrl: string;
    wonderwallUrl: string;
    logoutUrl: string;
    sentryUrl?: string;
    urlPapirsøknad: (skjematype: Skjematype) => string;
    miljø: 'local' | 'preprod' | 'production';
    modellVersjon: IModellversjon;
}

interface IModellversjon {
    pass_av_barn: number;
}

const SkjematypeTilPapirskjema: Record<Skjematype, string> = {
    [Skjematype.SØKNAD_PASS_AV_BARN]: 'nav111215b',
    [Skjematype.SØKNAD_LÆREMIDLER]: 'nav111216b',
    [Skjematype.SØKNAD_REISE_TIL_SAMLING]: 'nav111217b',
};

const urlPapirsøknadProd = (skjematype: Skjematype) =>
    `https://www.nav.no/fyllut/${SkjematypeTilPapirskjema[skjematype]}?sub=paper`;

const urlPapirsøknadDev = (skjematype: Skjematype) =>
    `https://skjemadelingslenke.ekstern.dev.nav.no/fyllut/${SkjematypeTilPapirskjema[skjematype]}?sub=paper`;

export const Environment = (): EnvironmentProps => {
    const modellVersjon = { overgangsstønad: 7, pass_av_barn: 2, skolepenger: 2 };

    if (window.location.hostname.indexOf('dev.nav.no') > -1) {
        const baseUrl = 'https://tilleggsstonader.ekstern.dev.nav.no/tilleggsstonader/soknad';
        return {
            apiProxyUrl: `${baseUrl}/api`,
            vedleggProxyUrl: `${baseUrl}/api/vedlegg`,
            wonderwallUrl: `${baseUrl}/oauth2/login?redirect=`,
            logoutUrl: 'https://login.ekstern.dev.nav.no/oauth2/logout',
            sentryUrl: 'https://06b839ad5487467cb88097c5a27bbbb5@sentry.gc.nav.no/167',
            urlPapirsøknad: urlPapirsøknadDev,
            miljø: 'preprod',
            modellVersjon: modellVersjon,
        };
    } else if (window.location.hostname.indexOf('nav.no') > -1) {
        const baseUrl = 'https://www.nav.no/tilleggsstonader/soknad';
        return {
            apiProxyUrl: `${baseUrl}/api`,
            vedleggProxyUrl: `${baseUrl}/api/vedlegg`,
            wonderwallUrl: `${baseUrl}/oauth2/login?redirect=`,
            logoutUrl: 'https://login.nav.no/oauth2/logout',
            sentryUrl: 'https://06b839ad5487467cb88097c5a27bbbb5@sentry.gc.nav.no/167',
            urlPapirsøknad: urlPapirsøknadProd,
            miljø: 'production',
            modellVersjon: modellVersjon,
        };
    } else {
        const baseUrl = 'http://localhost:8080';
        return {
            apiProxyUrl: `${baseUrl}/api`,
            vedleggProxyUrl: `${baseUrl}/api/vedlegg/tillegg`,
            wonderwallUrl: `http://localhost:8001/test/cookie?redirect=`,
            logoutUrl: 'http://localhost:8000/oauth2/logout',
            urlPapirsøknad: urlPapirsøknadDev,
            miljø: 'local',
            modellVersjon: modellVersjon,
        };
    }
};
