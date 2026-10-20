import { VedleggstypeFlytting } from '../../typer/skjema';
import { Vedleggstekst } from '../../typer/tekst';

export const typerVedleggTeksterFlytting: Record<VedleggstypeFlytting, Vedleggstekst> = {
    [VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_1]: {
        tittel: { nb: 'Tilbud fra flyttebyrå 1' },
        beskrivelse: { nb: 'Last opp tilbudet fra flyttebyrå 1 med navn og beløp.' },
    },
    [VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_2]: {
        tittel: { nb: 'Tilbud fra flyttebyrå 2' },
        beskrivelse: { nb: 'Last opp tilbudet fra flyttebyrå 2 med navn og beløp.' },
    },
};
