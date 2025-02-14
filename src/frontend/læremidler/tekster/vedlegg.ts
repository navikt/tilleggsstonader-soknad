import { VedleggstypeLæremidler } from '../../typer/skjema';
import { Vedleggstekst } from '../../typer/tekst';

type TekstTypeVedlegg = {
    [key in VedleggstypeLæremidler]: Vedleggstekst;
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
