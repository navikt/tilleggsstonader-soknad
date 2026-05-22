import { VedleggstypeReiseTilSamling } from '../../typer/skjema';
import { Vedleggstekst } from '../../typer/tekst';

type TekstTypeVedlegg = {
    [key in VedleggstypeReiseTilSamling]: Vedleggstekst;
};

export const typerVedleggTeksterReiseTilSamling: TekstTypeVedlegg = {
    [VedleggstypeReiseTilSamling.BEKREFTELSE_SAMLINGER]: {
        tittel: {
            nb: 'Bekreftelse for alle samlingene du skal delta på',
        },
        liste_tittel: {
            nb: 'Bekreftelse for alle samlingene du skal delta på',
        },
        beskrivelse: {
            nb: 'Last opp bekreftelse fra arrangøren som viser hvilke samlinger du skal delta på.',
        },
    },
};
