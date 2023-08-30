import { TekstElement } from '../typer/tekst';

export interface FellesInnhold {
    sendInnSøknad: TekstElement<string>;
    sendInnSøknadFeil: TekstElement<string>;
    neste: TekstElement<string>;
    forrige: TekstElement<string>;
    banner_bt: TekstElement<string>;
}

export const fellesTekster: FellesInnhold = {
    sendInnSøknad: {
        nb: 'Send inn søknad',
    },
    sendInnSøknadFeil: {
        nb: 'Innsending feilet, prøv på nytt.',
    },
    neste: {
        nb: 'Neste',
    },
    forrige: {
        nb: 'Forrige',
    },
    banner_bt: {
        nb: 'Søknad om støtte til pass av barn',
    },
};
