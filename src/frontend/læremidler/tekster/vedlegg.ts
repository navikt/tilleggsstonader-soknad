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
    [VedleggstypeLæremidler.UTGIFTER_LÆREMIDLER]: {
        tittel: {
            nb: 'Dokumentasjon på utgifter til læremidler',
        },
        liste_tittel: {
            nb: 'Dokumentasjon på utgifter til læremidler',
        },
        beskrivelse: {
            nb: 'Du må dokumentere alle utgiftene du ønsker å få dekket. Kvitteringer og fakturaer må være spesifisert.',
        },
    },
};
