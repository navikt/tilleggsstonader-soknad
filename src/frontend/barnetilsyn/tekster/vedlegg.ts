import { LesMer, TekstElement } from '../../typer/tekst';

interface VedleggInnhold {
    steg_tittel: TekstElement<string>;
    innhold_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
    du_må_legge_ved: TekstElement<string>;
    samlet_faktura: TekstElement<string>;
    faktura_lesmer: LesMer<string[]>;
    last_opp_faktura: TekstElement<string>;
    last_opp_legeerklæring: TekstElement<string>;

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

    // Hardkodet:
    pass_ronja_espen: TekstElement<string>;
    vedlegg_espen_ronja: TekstElement<string[]>;
    legeerklæring_espen_tittel: TekstElement<string>;
    legeerklæring_espen: TekstElement<string>;
}

const formatKvalitetAccordian: VedleggInnhold['accordians']['format_kvalitet'] = {
    tittel: {
        nb: 'Format og kvalitet på vedlegg',
    },
    innhold: {
        nb: 'Du kan laste opp vedlegg png, pdf eller jpeg. Det er viktig at bildet har god nok oppløsning/kvalitet til at vi kan lese det. ',
    },
};

const harIkkeVedleggDigitalAccordian: VedleggInnhold['accordians']['har_ikke_vedlegg_digital'] = {
    har_ikke_vedlegg_digital: {
        nb: 'Har du ikke vedleggene digitalt?',
    },
    slik_ta_bilde: {
        nb: 'Slik tar du et godt bilde:',
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
    steg_tittel: {
        nb: 'Vedlegg',
    },
    innhold_tittel: {
        nb: 'Laste opp vedlegg',
    },
    guide_innhold: {
        nb: [
            'Vi kan ikke starte saksbehandlingen før vi har all dokumentasjon fra deg.',
            'Har du ikke alle vedleggene i dag, kan du ettersende digitalt eller per post, senest innen 14 dager. Trenger du mer tid, kan du be om lenger frist på Ditt Nav etter at søknaden er sendt inn.',
        ],
    },
    du_må_legge_ved: {
        nb: 'Ut fra det du har svart i søknaden, må du legge ved:',
    },
    samlet_faktura: {
        nb: 'Har du samlet faktura for flere barn, trenger du bare å laste den opp en gang.',
    },
    faktura_lesmer: {
        header: { nb: 'Innhold i fakturaene' },
        innhold: {
            nb: [
                'Fakturaen må inneholde barnets navn, beløp og perioden den gjelder for. Vi dekker ikke mat eller bleier.',
                'Vi godkjenner ikke skjermbilde av kontoutskrift, vipps eller lignende fordi vi trenger å se hva som er utgifter til pass av barn og hva som er utgift til bleier eller mat.',
            ],
        },
    },
    last_opp_faktura: {
        nb: 'Last opp faktura',
    },
    last_opp_legeerklæring: {
        nb: 'Last opp legeerklæring',
    },
    accordians: {
        har_ikke_vedlegg_digital: harIkkeVedleggDigitalAccordian,
        format_kvalitet: formatKvalitetAccordian,
    },

    // Hardkodet:
    pass_ronja_espen: {
        nb: 'Pass av Ronja og Espen',
    },
    vedlegg_espen_ronja: {
        nb: [
            'Avtale med privat barnepasser for Ronja',
            'A-melding sendt Skatteetaten for barnepasser for Ronja',
            'Faktura fra SFO/AKS for Espen',
        ],
    },
    legeerklæring_espen_tittel: {
        nb: 'Legeerklæring for Espen',
    },
    legeerklæring_espen: {
        nb: 'Legerklæringen må inneholde opplysninger om hvorfor Espen trenger ekstra pass. ',
    },
};
