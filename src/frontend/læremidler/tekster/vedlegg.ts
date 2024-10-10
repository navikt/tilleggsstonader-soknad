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
            nb: 'Dokumentasjon på utgifter',
        },
        liste_tittel: {
            nb: 'Dokumentasjon på utgifter til læremidler',
        },
        beskrivelse: {
            nb: 'Fakturaene må være spesifisert. Vi godkjenner ikke skjermbilde av kontoutskrift/vipps eller lignende.',
        },
    },
};
