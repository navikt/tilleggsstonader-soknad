import { init, track } from '@amplitude/analytics-browser';

import { stønadstypeTilSkjemaId, stønadstypeTilSkjemanavn } from '../typer/skjemanavn';
import { Stønadstype } from '../typer/stønadstyper';

const APP_NAVN = 'tilleggsstonader-soknad';

type eventType =
    | 'skjema startet'
    | 'skjema steg fullført'
    | 'skjema innsending feilet'
    | 'skjema fullført'
    | 'navigere'
    | 'alert vist'
    | 'besøk'
    | 'accordion åpnet'
    | 'accordion lukket';

export const initAmplitude = () => {
    init('default', '', {
        useBatch: true,
        defaultTracking: false,
        serverUrl: 'https://amplitude.nav.no/collect-auto',
        ingestionMetadata: {
            sourceName: window.location.toString(),
        },
    });
};

export const loggEventMedSkjema = (
    event: eventType,
    stønadstype: Stønadstype,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event_properties?: any
) => {
    track(event, {
        app: APP_NAVN,
        skjemanavn: stønadstypeTilSkjemanavn[stønadstype],
        skjemaId: stønadstypeTilSkjemaId[stønadstype],
        ...event_properties,
    });
};

export const loggSkjemaStartet = (stønadstype: Stønadstype) => {
    track('skjema startet', {
        app: APP_NAVN,
        skjemanavn: stønadstypeTilSkjemanavn[stønadstype],
        skjemaId: stønadstypeTilSkjemaId[stønadstype],
    });
};

export const loggSkjemaStegFullført = (stønadstype: Stønadstype, steg: string) => {
    loggEventMedSkjema('skjema steg fullført', stønadstype, { steg: steg });
};

export const loggSkjemaInnsendtFeilet = (stønadstype: Stønadstype) => {
    loggEventMedSkjema('skjema innsending feilet', stønadstype);
};

export const loggSkjemaFullført = (stønadstype: Stønadstype) => {
    loggEventMedSkjema('skjema fullført', stønadstype);
};

export const logNavigereEvent = (
    stønadstype: Stønadstype,
    destinasjon: string,
    lenketekst: string
) => {
    loggEventMedSkjema('navigere', stønadstype, {
        destinasjon: destinasjon,
        lenketekst: lenketekst,
    });
};

export const loggAlertVist = (variant: string, tekst: string) => {
    loggEventMedSkjema('alert vist', Stønadstype.BARNETILSYN, {
        variant: variant,
        tekst: tekst,
    });
};

export const loggBesøkBarnetilsyn = (url: string, sidetittel: string) => {
    loggEventMedSkjema('besøk', Stønadstype.BARNETILSYN, {
        url: url,
        sidetittel: sidetittel,
    });
};

export const loggBesøkLæremiddel = (url: string, sidetittel: string) => {
    loggEventMedSkjema('besøk', Stønadstype.LÆREMIDLER, {
        url: url,
        sidetittel: sidetittel,
    });
};

export const loggAccordionEvent = (skalÅpnes: boolean, tekst: string, side?: string) => {
    const event = skalÅpnes ? 'accordion åpnet' : 'accordion lukket';

    loggEventMedSkjema(event, Stønadstype.BARNETILSYN, {
        tekst: tekst,
        side: side,
    });
};
