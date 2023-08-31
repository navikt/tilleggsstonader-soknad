import { JaNei } from '../typer/søknad';
import { TekstElement } from '../typer/tekst';

export interface FellesInnhold {
    neste: TekstElement<string>;
    forrige: TekstElement<string>;
    banner_bt: TekstElement<string>;
}

export const fellesTekster: FellesInnhold = {
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
export const jaNeiAlternativer: { value: JaNei; label: TekstElement<string> }[] = [
    {
        value: 'ja',
        label: {
            nb: 'Ja',
        },
    },
    {
        value: 'nei',
        label: {
            nb: 'Nei',
        },
    },
];
