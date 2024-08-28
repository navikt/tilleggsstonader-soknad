import { VedleggstypeLæremidler } from '../../typer/skjema';
import { Vedlegg } from '../../typer/tekst';

type TekstTypeVedlegg = {
    [key in VedleggstypeLæremidler]: Vedlegg;
};

export const typerVedleggTeksterLæremidler: TekstTypeVedlegg = {
    [VedleggstypeLæremidler.DOKUMENTASJON_FUNKSJONSNEDSETTELSE]: {
        tittel: {
            nb: 'Dokumentasjon på funksjonsnedsettelse',
        },
        liste_tittel: {
            nb: 'Dokumentasjon på din funksjonshemming',
        },
        beskrivelse: {
            nb: 'Legeerklæring eller annen uttalelse fra helsepersonell som beskriver din helsetilstand.',
        },
    },
};
