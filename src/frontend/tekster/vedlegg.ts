import { typerVedleggTeksterPassAvBarn } from '../barnetilsyn/tekster/vedlegg';
import { typerVedleggTeksterLæremidler } from '../læremidler/tekster/vedlegg';
import { TekstElement } from '../typer/tekst';

export const typerVedleggTekster = {
    ...typerVedleggTeksterLæremidler,
    ...typerVedleggTeksterPassAvBarn,
};

interface VedleggInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
    dokumentasjonskrav_tittel: TekstElement<string>;
    dokumentasjonskrav_samlet_faktura: TekstElement<string>;

    accordians: {
        har_ikke_vedlegg_digital: {
            har_ikke_vedlegg_digital: TekstElement<string>;
            slik_ta_bilde: TekstElement<string>;
            instruksjoner: TekstElement<string[]>;
            ettet_tatt_bilde: TekstElement<string>;
            instruksjoner_etter: TekstElement<string[]>;
        };
        format_kvalitet: {
            tittel: TekstElement<string>;
            innhold: TekstElement<string>;
        };
    };
    ingen_dokumentasjonsbehov: TekstElement<string>;
}

const formatKvalitetAccordian: VedleggInnhold['accordians']['format_kvalitet'] = {
    tittel: {
        nb: 'Format og kvalitet på vedlegg',
    },
    innhold: {
        nb: 'Du kan laste opp vedlegg med filformat .png, .pdf .jpg eller .jpeg. Det er viktig at bildet har god nok oppløsning/kvalitet til at vi kan lese det. ',
    },
};

const harIkkeVedleggDigitalAccordian: VedleggInnhold['accordians']['har_ikke_vedlegg_digital'] = {
    har_ikke_vedlegg_digital: {
        nb: 'Har du bare vedlegg på papir?',
    },
    slik_ta_bilde: {
        nb: 'Du kan skanne eller ta bilde med mobilen:',
    },
    instruksjoner: {
        nb: [
            'Hold mobilen eller kameraet direkte over dokumentet.',
            'Dokumentet skal fylle hele bildet. Bildet skal ikke inneholde annen dokumentasjon eller gjenstander.',
            'Bildet må inneholde all tekst i dokumentet. Hvis dokumentet er på mer enn èn side, bør du laste opp flere bilder.',
        ],
    },
    ettet_tatt_bilde: {
        nb: 'Etter at du har tatt bildet, sjekk følgende før du laster opp:',
    },
    instruksjoner_etter: {
        nb: [
            'Dokumentet har riktig retning.',
            'Teksten til dokumentet er godt leselig.',
            'Bildet er godt opplyst, uten skygger.',
        ],
    },
};

export const vedleggTekster: VedleggInnhold = {
    tittel: {
        nb: 'Vedlegg',
    },
    guide_innhold: {
        nb: [
            'Vi kan ikke starte saksbehandlingen før vi har all dokumentasjon fra deg.',
            'Har du ikke alle vedleggene i dag, kan du ettersende digitalt eller per post, senest innen 14 dager. Trenger du mer tid, kan du be om lenger frist på Min side på NAV.no etter at søknaden er sendt inn.',
        ],
    },
    dokumentasjonskrav_tittel: { nb: 'Ut fra det du har svart i søknaden, må du legge ved:' },
    dokumentasjonskrav_samlet_faktura: {
        nb: 'Har du samlet faktura for flere barn, trenger du bare å laste den opp en gang.',
    },

    accordians: {
        har_ikke_vedlegg_digital: harIkkeVedleggDigitalAccordian,
        format_kvalitet: formatKvalitetAccordian,
    },
    ingen_dokumentasjonsbehov: { nb: 'Du trenger ikke å legge ved noen dokumentasjon' },
};

interface VedleggManglerModalInnhold {
    heading: TekstElement<string>;
    punktliste_tittel: TekstElement<string>;
    ekstra_info1: TekstElement<string>;
    ekstra_info2: TekstElement<string>;
    vil_du_fortsette: TekstElement<string>;
    fortsettKnapp: TekstElement<string>;
    avbrytKnapp: TekstElement<string>;
}

export const vedleggModalTekster: VedleggManglerModalInnhold = {
    heading: { nb: 'Vedlegg mangler' },
    punktliste_tittel: { nb: 'Vi kan ikke se at du har lagt ved:' },
    ekstra_info1: {
        nb: 'Vi kan ikke starte saksbehandlingen før vi har all dokumentasjon fra deg.',
    },
    ekstra_info2: {
        nb: 'Har du ikke alle vedleggene i dag, kan du ettersende digitalt eller per post, innen 14 dager.',
    },
    vil_du_fortsette: { nb: 'Vil du fortsatt sende søknaden nå? ' },
    fortsettKnapp: { nb: 'Ja, gå til neste side' },
    avbrytKnapp: { nb: 'Nei, gå tilbake til vedlegg' },
};
