import { init, track } from '@amplitude/analytics-browser';

import { stønadstypeTilSkjemaId, stønadstypeTilSkjemanavn } from '../typer/skjemanavn';
import { Stønadstype } from '../typer/stønadstyper';

const APP_NAVN = 'tilleggsstonader-soknad';

// Events fra https://github.com/navikt/analytics-taxonomy/tree/main/events
type eventType =
    | 'skjema startet'
    | 'skjema steg fullført'
    | 'skjema innsending feilet'
    | 'skjema fullført'
    | 'navigere'
    | 'alert vist'
    | 'besøk'
    | 'skjema spørsmål besvart'
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

export const loggAlertVist = (stønadstype: Stønadstype, variant: string, tekst: string) => {
    loggEventMedSkjema('alert vist', stønadstype, {
        variant: variant,
        tekst: tekst,
    });
};

export const loggBesøk = (stønadstype: Stønadstype, url: string, sidetittel: string) => {
    loggEventMedSkjema('besøk', stønadstype, {
        url: url,
        sidetittel: sidetittel,
    });
};

export const loggAccordionEvent = (
    stønadstype: Stønadstype,
    skalÅpnes: boolean,
    tekst: string,
    side?: string
) => {
    const event = skalÅpnes ? 'accordion åpnet' : 'accordion lukket';

    loggEventMedSkjema(event, stønadstype, {
        tekst: tekst,
        side: side,
    });
};

export const loggSkjemaSpørsmålBesvart = (
    stønadstype: Stønadstype,
    spørsmål: string,
    svar: string
) => {
    loggEventMedSkjema('skjema spørsmål besvart', stønadstype, {
        spørsmål: spørsmål,
        svar: svar,
    });
};
