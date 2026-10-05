import { TekstElement } from '../../typer/tekst';

interface OppsummeringInnhold {
    tittel: TekstElement<string>;
    aktivitet_tittel: TekstElement<string>;
}

export const oppsummeringTekster: OppsummeringInnhold = {
    tittel: { nb: 'Oppsummering' },
    aktivitet_tittel: { nb: 'Aktivitet' },
};
