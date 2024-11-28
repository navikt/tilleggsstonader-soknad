import { TekstElement } from '../../typer/tekst';

interface OppsummeringInnhold {
    tittel: TekstElement<string>;
    utdanning_tittel: TekstElement<string>;
    vedlegg_tittel: TekstElement<string>;
    ingen_vedlegg: TekstElement<string>;
}

export const oppsummeringTekster: OppsummeringInnhold = {
    tittel: { nb: 'Oppsummering' },
    utdanning_tittel: { nb: 'Utdanning' },
    vedlegg_tittel: { nb: 'Vedlegg' },
    ingen_vedlegg: { nb: 'Ingen vedlegg' },
};
