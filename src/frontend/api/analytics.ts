import { getAmplitudeInstance } from '@navikt/nav-dekoratoren-moduler';

import Environment from './Environment';
import { stønadstypeTilSkjemaId, stønadstypeTilSkjemanavn } from '../typer/skjemanavn';
import { Stønadstype } from '../typer/stønadstyper';

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

const getLogger = () => {
    if (Environment().miljø !== 'local') {
        return getAmplitudeInstance('dekoratoren');
    } else {
        return null;
    }
};

const logger = getLogger();

export const loggEventMedSkjema = (
    event: eventType,
    stønadstype: Stønadstype,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event_properties?: any
) => {
    if (logger) {
        logger(event, {
            app: APP_NAVN,
            skjemanavn: stønadstypeTilSkjemanavn[stønadstype],
            skjemaId: stønadstypeTilSkjemaId[stønadstype],
            ...event_properties,
        });
    }
};

export const loggSkjemaStartet = (stønadstype: Stønadstype) => {
    loggEventMedSkjema('skjema startet', stønadstype);
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
