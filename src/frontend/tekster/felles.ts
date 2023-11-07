import { JaNei } from '../typer/søknad';
import { TekstElement } from '../typer/tekst';

export interface FellesInnhold {
    send_inn_søknad: TekstElement<string>;
    send_inn_søknad_feil: TekstElement<string>;
    neste: TekstElement<string>;
    forrige: TekstElement<string>;
    banner_bt: TekstElement<string>;
}

export const fellesTekster: FellesInnhold = {
    send_inn_søknad: {
        nb: 'Send inn søknad',
    },
    send_inn_søknad_feil: {
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

export const JaNeiTilTekst: Record<JaNei, TekstElement<string>> = {
    JA: {
        nb: 'Ja',
    },
    NEI: {
        nb: 'Nei',
    },
};

export const jaNeiAlternativer: { value: JaNei; label: TekstElement<string> }[] = [
    {
        value: 'JA',
        label: JaNeiTilTekst.JA,
    },
    {
        value: 'NEI',
        label: JaNeiTilTekst.NEI,
    },
];
