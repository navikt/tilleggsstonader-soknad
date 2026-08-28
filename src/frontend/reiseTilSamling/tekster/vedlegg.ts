import { VedleggstypeReiseTilSamling } from '../../typer/skjema';
import type { Vedleggstekst } from '../../typer/tekst';

type TekstTypeVedlegg = {
    [key in VedleggstypeReiseTilSamling]: Vedleggstekst;
};

export const typerVedleggTeksterReiseTilSamling: TekstTypeVedlegg = {
    [VedleggstypeReiseTilSamling.BEKREFTELSE_SAMLINGER]: {
        tittel: {
            nb: 'Bekreftelse fra arrangøren som viser hvilke samlinger du skal delta på.'
        },
        liste_tittel: {
            nb: 'Bekreftelse på samlingene du skal delta på.'
        },
        beskrivelse: {
            nb: 'Last opp bekreftelse fra arrangøren som viser hvilke samlinger du skal delta på. Det må også komme frem at samlingene er obligatoriske.'
        }
    },
    [VedleggstypeReiseTilSamling.UTGIFTER_OFFENTLIG_TRANSPORT]: {
        tittel: {
            nb: 'Dokumentasjon på reiseutgifter.'
        },
        liste_tittel: {
            nb: 'Dokumentasjon på reiseutgifter.'
        },
        beskrivelse: {
            nb: 'Last opp kvitteringer eller billetter som dokumenterer reiseutgiftene dine.'
        }
    },
    [VedleggstypeReiseTilSamling.SKRIFTLIG_UTTALELSE_HELSEPERSONELL_REISE_TIL_SAMLING]: {
        tittel: {
            nb: 'Skriftlig uttalelse fra helsepersonell.'
        },
        liste_tittel: {
            nb: 'Legeerklæring eller uttalelse fra helsepersonell.'
        },
        beskrivelse: {
            nb: 'Last opp legeerklæring eller annen uttalelse fra helsepersonell som beskriver helsetilstanden din.'
        }
    },
    [VedleggstypeReiseTilSamling.UTGIFTER_TAXI]: {
        tittel: {
            nb: 'Dokumentasjon på reiseutgifter.'
        },
        liste_tittel: {
            nb: 'Dokumentasjon på reiseutgifter.'
        },
        beskrivelse: {
            nb: 'Last opp kvitteringer eller billetter som dokumenterer reiseutgiftene dine.'
        }
    },
    [VedleggstypeReiseTilSamling.TT_KORT]: {
        tittel: {
            nb: 'Dokumentasjon på TT-kort.'
        },
        liste_tittel: {
            nb: 'Dokumentasjon på TT-kort.'
        },
        beskrivelse: {
            nb: 'Du må sende inn dokumentasjon som viser hvilke type reiser TT-kortet ditt kan brukes til og hva du eventuelt må betale i egenandel.'
        }
    }
};
