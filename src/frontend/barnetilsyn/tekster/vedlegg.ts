import { TekstElement } from '../../typer/tekst';

interface VedleggInnhold {
    steg_tittel: TekstElement<string>;
    innhold_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
}

export const vedleggTekster: VedleggInnhold = {
    steg_tittel: {
        nb: 'Vedlegg',
    },
    innhold_tittel: {
        nb: 'Laste opp vedlegg',
    },
    guide_innhold: {
        nb: [
            'Har du ikke alle vedleggene i dag, kan du ettersende digitalt eller per post senest innen 14 dager.',
            'Vi kan ikke starte saksbehandlingen før vi har all dokumentasjon fra deg. Trenger du mer tid, kan du be om lenger frist på Ditt Nav etter at søknaden er sendt inn.',
        ],
    },
};
