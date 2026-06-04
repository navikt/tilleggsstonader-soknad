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
    skjematype: Skjematype,
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
            skjemanavn: skjematypeTilSkjemanavn[skjematype],
            skjemaId: skjematypeTilSkjemaId[skjematype],
            ...eventProperties,
        },
    }).catch(() => {
        // enten feil med lastingen av Umami, eller så har brukeren ikke samtykket.
    });
};

export const loggSkjemaStartet = (skjematype: Skjematype) => {
    sendUmamiEvent('skjema startet', skjematype);
};

export const loggSkjemaStegFullført = (skjematype: Skjematype, steg: string) => {
    sendUmamiEvent('skjema steg fullført', skjematype, { steg: steg });
};

export const loggSkjemaInnsendtFeilet = (skjematype: Skjematype) => {
    sendUmamiEvent('skjema innsending feilet', skjematype);
};

export const loggSkjemaFullført = (skjematype: Skjematype) => {
    sendUmamiEvent('skjema fullført', skjematype);
};

export const logNavigereEvent = (
    skjematype: Skjematype,
    destinasjon: string,
    lenketekst: string
) => {
    sendUmamiEvent('navigere', skjematype, {
        destinasjon: destinasjon,
        lenketekst: lenketekst,
    });
};

export const loggAlertVist = (skjematype: Skjematype, variant: string, tekst: string) => {
    sendUmamiEvent('alert vist', skjematype, {
        variant: variant,
        tekst: tekst,
    });
};

export const loggBesøk = (skjematype: Skjematype, url: string, sidetittel: string) => {
    sendUmamiEvent('besøk', skjematype, {
        url: url,
        sidetittel: sidetittel,
    });
};

export const loggAccordionEvent = (
    skjematype: Skjematype,
    skalÅpnes: boolean,
    tekst: string,
    side?: string
) => {
    const event = skalÅpnes ? 'accordion åpnet' : 'accordion lukket';

    sendUmamiEvent(event, skjematype, {
        tekst: tekst,
        side: side,
    });
};

export const loggSkjemaSpørsmålBesvart = (
    skjematype: Skjematype,
    spørsmål: string,
    svar: string
) => {
    sendUmamiEvent('skjema spørsmål besvart', skjematype, {
        spørsmål: spørsmål,
        svar: svar,
    });
};
