import { VedleggstypeFlytting } from '../../typer/skjema';
import { Vedleggstekst } from '../../typer/tekst';

export const typerVedleggTeksterFlytting: Record<VedleggstypeFlytting, Vedleggstekst> = {
    [VedleggstypeFlytting.UTGIFTER_EGEN_FLYTTING]: {
        tittel: { nb: 'Dokumentasjon av utgifter ved egen flytting' },
        beskrivelse: { nb: 'Last opp dokumentasjon av utgiftene dine til flytting.' },
    },
    [VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_1]: {
        tittel: { nb: 'Tilbud fra flyttebyrå 1' },
        beskrivelse: { nb: 'Last opp tilbudet fra flyttebyrå 1 med navn og beløp.' },
    },
    [VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_2]: {
        tittel: { nb: 'Tilbud fra flyttebyrå 2' },
        beskrivelse: { nb: 'Last opp tilbudet fra flyttebyrå 2 med navn og beløp.' },
    },
};
