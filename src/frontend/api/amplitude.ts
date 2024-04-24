import { init, track } from '@amplitude/analytics-browser';

import { Skjemanavn, skjemanavnTilId, stønadstypeTilSkjemanavn } from '../typer/skjemanavn';
import { Stønadstype } from '../typer/stønadstyper';

const APP_NAVN = 'tilleggsstonader-soknad';

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

export const loggSkjemaStartet = (stønadstype: Stønadstype) => {
    const skjemanavn = stønadstypeTilSkjemanavn[stønadstype];
    track('skjema startet', {
        app: APP_NAVN,
        skjemanavn: skjemanavn,
        skjemaId: skjemanavnTilId[skjemanavn],
    });
};

export const loggSkjemaStegFullført = (stønadstype: Stønadstype, steg: string) => {
    const skjemanavn = stønadstypeTilSkjemanavn[stønadstype];
    track('skjema steg fullført', {
        app: APP_NAVN,
        skjemanavn: skjemanavn,
        skjemaId: skjemanavnTilId[skjemanavn],
        steg: steg,
    });
};

export const loggSkjemaInnsendtFeilet = (stønadstype: Stønadstype) => {
    const skjemanavn = stønadstypeTilSkjemanavn[stønadstype];

    track('skjema innsending feilet', {
        app: APP_NAVN,
        skjemanavn: skjemanavn,
        skjemaId: skjemanavnTilId[skjemanavn],
    });
};

export const loggSkjemaFullført = (stønadstype: Stønadstype) => {
    const skjemanavn = stønadstypeTilSkjemanavn[stønadstype];

    track('skjema fullført', {
        app: APP_NAVN,
        skjemanavn: skjemanavn,
        skjemaId: skjemanavnTilId[skjemanavn],
    });
};

export const logNavigereEvent = (
    stønadstype: Stønadstype,
    destinasjon: string,
    lenketekst: string
) => {
    const skjemanavn = stønadstypeTilSkjemanavn[stønadstype];
    track('navigere', {
        app: APP_NAVN,
        skjemanavn: skjemanavn,
        skjemaId: skjemanavnTilId[skjemanavn],
        destinasjon: destinasjon,
        lenketekst: lenketekst,
    });
};

export const loggAlertVist = (variant: string, tekst: string) => {
    track('alert vist', {
        app: APP_NAVN,
        skjemanavn: Skjemanavn.tilsyn_barn,
        skjemaId: skjemanavnTilId[Skjemanavn.tilsyn_barn],
        variant: variant,
        tekst: tekst,
    });
};
