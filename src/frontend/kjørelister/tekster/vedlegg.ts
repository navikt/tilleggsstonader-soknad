import { VedleggstypeKjøreliste } from '../../typer/skjema';
import { Vedleggstekst } from '../../typer/tekst';

export type TekstTypeVedlegg = {
    [key in VedleggstypeKjøreliste]: Vedleggstekst;
};

export const typerVedleggTeksterKjørelister: TekstTypeVedlegg = {
    [VedleggstypeKjøreliste.PARKERINGSUTGIFT]: {
        tittel: {
            nb: 'TODO ikke tatt i bruk, gjøres i egen oppgave',
        },
        beskrivelse: {
            nb: 'TODO ikke tatt i bruk, gjøres i egen oppgave',
        },
    },
};
