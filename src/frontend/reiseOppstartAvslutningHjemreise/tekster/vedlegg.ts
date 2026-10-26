import { VedleggstypeROAH } from '../../typer/skjema';
import { Vedleggstekst } from '../../typer/tekst';

type TekstTypeVedlegg = {
    [key in VedleggstypeROAH]: Vedleggstekst;
};

export const typerVedleggTeksterROAH: TekstTypeVedlegg = {
    [VedleggstypeROAH.UTGIFTER_ROAH]: {
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
    [VedleggstypeROAH.SKRIFTLIG_UTTALELSE_HELSEPERSONELL_ROAH]: {
        tittel: {
            nb: 'Skriftlig uttalelse fra helsepersonell.',
        },
        liste_tittel: {
            nb: 'Legeerklæring eller uttalelse fra helsepersonell.',
        },
        beskrivelse: {
            nb: 'Last opp legeerklæring eller annen uttalelse fra helsepersonell som beskriver helsetilstanden din og behovet for bruk av alternativ transport.',
        },
    },
    [VedleggstypeROAH.SÆRLIGE_BEHOV_ROAH]: {
        tittel: {
            nb: 'Dokumentasjon på særlige behov for flere hjemreiser.',
        },
        liste_tittel: {
            nb: 'Dokumentasjon på særlige behov for flere hjemreiser.',
        },
        beskrivelse: {
            nb: 'Last opp dokumentasjon som bekrefter ditt særlige behov for flere hjemreiser.',
        },
    },
    [VedleggstypeROAH.TT_KORT_ROAH]: {
        tittel: {
            nb: 'Dokumentasjon på TT-kort.',
        },
        liste_tittel: {
            nb: 'Dokumentasjon på TT-kort.',
        },
        beskrivelse: {
            nb: 'Du må sende inn dokumentasjon som viser hvilke type reiser TT-kortet ditt kan brukes til og hva du eventuelt må betale i egenandel.',
        },
    },
};
