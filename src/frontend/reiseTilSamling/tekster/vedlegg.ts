import { VedleggstypeReiseTilSamling } from '../../typer/skjema';
import { Vedleggstekst } from '../../typer/tekst';

type TekstTypeVedlegg = {
    [key in VedleggstypeReiseTilSamling]: Vedleggstekst;
};

export const typerVedleggTeksterReiseTilSamling: TekstTypeVedlegg = {
    [VedleggstypeReiseTilSamling.BEKREFTELSE_SAMLINGER]: {
        tittel: {
            nb: 'Bekreftelse fra arrangøren som viser hvilke samlinger du skal delta på.',
        },
        liste_tittel: {
            nb: 'Bekreftelse på samlingene du skal delta på.',
        },
        beskrivelse: {
            nb: 'Last opp bekreftelse fra arrangøren som viser hvilke samlinger du skal delta på. Det må også komme frem at samlingene er obligatoriske.',
        },
    },
    [VedleggstypeReiseTilSamling.UTGIFTER_OFFENTLIG_TRANSPORT]: {
        tittel: {
            nb: 'Dokumentasjon på reiseutgifter.',
        },
        liste_tittel: {
            nb: 'Dokumentasjon på reiseutgifter.',
        },
        beskrivelse: {
            nb: 'Last opp kvitteringer eller billetter som dokumenterer reiseutgiftene dine.',
        },
    },
};
