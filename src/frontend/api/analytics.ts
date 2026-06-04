import { logAnalyticsCustomEvent } from '@navikt/nav-dekoratoren-moduler';

import { Environment } from './Environment';
import { skjematypeTilSkjemaId, skjematypeTilSkjemanavn } from '../typer/skjemanavn';
import { Skjematype } from '../typer/skjematyper';

const APP_NAVN = 'tilleggsstonader-soknad';

// Events fra https://github.com/navikt/analytics-taxonomy/tree/main/events
type eventType =
    | 'skjema startet'
    | 'skjema spørsmål besvart'
    | 'skjema steg fullført'
    | 'skjema validering feilet'
    | 'skjema innsending feilet'
    | 'skjema fullført'
    | 'navigere'
    | 'filtervalg'
    | 'guidepanel vist'
    | 'last ned'
    | 'alert vist'
    | 'besøk'
    | 'søk'
    | 'modal åpnet'
    | 'modal lukket'
    | 'accordion åpnet'
    | 'accordion lukket';

export const sendUmamiEvent = (
    event: eventType,
    stønadstype: Skjematype,
    eventProperties?: Record<string, unknown>
) => {
    if (Environment().miljø === 'local') {
        // eslint-disable-next-line no-console
        console.log(
            `[BARE LOKALT] Sender umami-event med eventType=${event} og eventProperties=${JSON.stringify(eventProperties)}`
        );
    }
    logAnalyticsCustomEvent({
        origin: APP_NAVN,
        eventName: event,
        eventData: {
            skjemanavn: skjematypeTilSkjemanavn[stønadstype],
            skjemaId: skjematypeTilSkjemaId[stønadstype],
            ...eventProperties,
        },
    }).catch(() => {
        // enten feil med lastingen av Umami, eller så har brukeren ikke samtykket.
    });
};

export const loggSkjemaStartet = (stønadstype: Skjematype) => {
    sendUmamiEvent('skjema startet', stønadstype);
};

export const loggSkjemaStegFullført = (stønadstype: Skjematype, steg: string) => {
    sendUmamiEvent('skjema steg fullført', stønadstype, { steg: steg });
};

export const loggSkjemaInnsendtFeilet = (stønadstype: Skjematype) => {
    sendUmamiEvent('skjema innsending feilet', stønadstype);
};

export const loggSkjemaFullført = (stønadstype: Skjematype) => {
    sendUmamiEvent('skjema fullført', stønadstype);
};

export const logNavigereEvent = (
    stønadstype: Skjematype,
    destinasjon: string,
    lenketekst: string
) => {
    sendUmamiEvent('navigere', stønadstype, {
        destinasjon: destinasjon,
        lenketekst: lenketekst,
    });
};

export const loggAlertVist = (stønadstype: Skjematype, variant: string, tekst: string) => {
    sendUmamiEvent('alert vist', stønadstype, {
        variant: variant,
        tekst: tekst,
    });
};

export const loggBesøk = (stønadstype: Skjematype, url: string, sidetittel: string) => {
    sendUmamiEvent('besøk', stønadstype, {
        url: url,
        sidetittel: sidetittel,
    });
};

export const loggAccordionEvent = (
    stønadstype: Skjematype,
    skalÅpnes: boolean,
    tekst: string,
    side?: string
) => {
    const event = skalÅpnes ? 'accordion åpnet' : 'accordion lukket';

    sendUmamiEvent(event, stønadstype, {
        tekst: tekst,
        side: side,
    });
};

export const loggSkjemaSpørsmålBesvart = (
    stønadstype: Skjematype,
    spørsmål: string,
    svar: string
) => {
    sendUmamiEvent('skjema spørsmål besvart', stønadstype, {
        spørsmål: spørsmål,
        svar: svar,
    });
};
