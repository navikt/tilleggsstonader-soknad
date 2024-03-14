import { Vedleggstype } from '../../typer/skjema';
import { TekstElement, Vedlegg } from '../../typer/tekst';

export type TekstTypeVedlegg = {
    [key in Vedleggstype]: Vedlegg;
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
}

const formatKvalitetAccordian: VedleggInnhold['accordians']['format_kvalitet'] = {
    tittel: {
        nb: 'Format og kvalitet på vedlegg',
    },
    innhold: {
        nb: 'Du kan laste opp vedlegg med filformat .png, .pdf eller .jpeg. Det er viktig at bildet har god nok oppløsning/kvalitet til at vi kan lese det. ',
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
        nb: 'Laste opp vedlegg',
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
};

export const typerVedleggTekster: TekstTypeVedlegg = {
    [Vedleggstype.UTGIFTER_PASS_SFO_AKS_BARNEHAGE]: {
        tittel: {
            nb: 'Dokumentasjon av utgifter for pass av [0]',
        },
        beskrivelse: {
            nb: 'Fakturaen må være spesifisert. Vi godkjenner ikke skjermbilde av kontoutskrift/vipps eller lignende. ',
        },
        krav_til_dokumentasjon: {
            nb: [
                'Dokumentasjon på utgifter må inneholde barnets navn, beløp og perioden den gjelder for. ',
                'Vi godkjenner ikke bilde av kontoutskrift, vipps eller lignende fordi vi trenger å se hva som er utgifter til pass av barn og hva som er utgift til bleier eller mat.',
            ],
        },
    },
    [Vedleggstype.UTGIFTER_PASS_ANNET]: {
        tittel: {
            nb: 'Dokumentasjon av utgifter for pass av [0]',
        },
        beskrivelse: {
            nb: 'Vi trenger avtale med barnepasser, kvittering for betaling og eventuelt A-melding sendt Skatteetaten.',
        },
        krav_til_dokumentasjon: {
            nb: [
                'Dokumentasjon på utgifter må inneholde barnets navn, beløp og perioden den gjelder for.',
                'Vi godkjenner ikke bilde av kontoutskrift, vipps eller lignende fordi vi trenger å se hva som er utgifter til pass av barn og hva som er utgift til bleier eller mat.',
                'Ved privat barnepass regnes du som arbeidsgiver og derfor er det  egne regler du kan lese om på Skatteetaten. ',
            ],
        },
    },
    [Vedleggstype.EKSTRA_PASS_BEHOV]: {
        tittel: {
            nb: 'Dokumentasjon på behov for ekstra pass for [0]',
        },
        beskrivelse: {
            nb: 'Legeerklæring eller annen uttalelse fra helsepersonell.',
        },
        krav_til_dokumentasjon: {
            nb: 'Legeerklæringen/uttalelsen fra helsepersonell må inneholde barnets navn og gjelde for perioden du søker om støtte til pass for.',
        },
    },
};
