import { TekstElement } from '../../typer/tekst';

interface AktivitetInnhold {
    steg_tittel: TekstElement<string>;
}

export const aktivitetTekster: AktivitetInnhold = {
    steg_tittel: {
        nb: 'Aktivitet',
    },
};
