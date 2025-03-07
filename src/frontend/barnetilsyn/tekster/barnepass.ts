import { JaNeiTilTekst } from '../../tekster/felles';
import { PassType, ÅrsakBarnepass } from '../../typer/barn';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

interface BarnepassInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    hvem_passer_radio: Radiogruppe<PassType>;
    har_utgifter_til_pass_radio: Radiogruppe<JaNei>;
    utgifter_dato: {
        label: TekstElement<string>;
        fom: TekstElement<string>;
        tom: TekstElement<string>;
    };
    feilmelding_tom_før_fom: TekstElement<string>;
    hvem_passer_andre_alert: {
        tittel: TekstElement<string>;
        innhold: TekstElement<string>;
    };
    hvem_passer_feilmelding: TekstElement<string>;
    har_utgifter_feilmelding: TekstElement<string>;
    utgifter_fom_feilmelding: TekstElement<string>;
    utgifter_tom_feilmelding: TekstElement<string>;

    startet_femte_radio: Radiogruppe<JaNei>;
    startet_femte_feilmelding: TekstElement<string>;
    startet_femte_readmore_header: TekstElement<string>;
    startet_femte_readmore_innhold: TekstElement<string>;
    startet_femte_readmore_punktliste: TekstElement<string[]>;
    årsak_ekstra_pass_radio: Radiogruppe<ÅrsakBarnepass>;
    årsak_ekstra_pass_feilmelding: TekstElement<string>;
    mer_pleie_alert: {
        tittel: TekstElement<string>;
        innhold: TekstElement<string>;
    };
    uvanlig_arbeidstid_alert: TekstElement<string>;
    ingen_av_disse_alert: TekstElement<string>;
}

export const PassTypeTilTekst: Record<PassType, TekstElement<string>> = {
    BARNEHAGE_SFO_AKS: { nb: 'Barnehage, skolefritidsordning (SFO) eller aktivitetsskole (AKS)' },
    PRIVAT: {
        nb: 'Dagmamma, praktikant eller annen privat ordning',
    },
};

export const ÅrsakEkstraPassTilTekst: Record<ÅrsakBarnepass, TekstElement<string>> = {
    TRENGER_MER_PASS_ENN_JEVNALDRENDE: {
        nb: 'Trenger mer pleie eller tilsyn enn det som er vanlig for jevnaldrende',
    },
    MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID: {
        nb: 'Jeg må være borte fra hjemmet på kvelden, natta, i helgen eller mer enn 10 timer per dag',
    },
    INGEN_AV_DISSE: {
        nb: 'Ingen av disse',
    },
};

export const barnepassTekster: BarnepassInnhold = {
    tittel: {
        nb: 'Pass av dine barn',
    },
    guide_innhold: {
        nb: 'Vi spør om hvordan barna dine skal passes for å informere deg om hvilken dokumentasjon du må legge ved søknaden.',
    },
    hvem_passer_radio: {
        header: { nb: 'Hvem skal passe [0]?' },
        alternativer: PassTypeTilTekst,
    },
    har_utgifter_til_pass_radio: {
        header: {
            nb: 'Har du utgifter til pass av [0] hele perioden du har arbeidsrettet aktivitet?',
        },
        alternativer: JaNeiTilTekst,
    },
    utgifter_dato: {
        label: {
            nb: 'Når har du utgifter til pass?',
        },
        fom: {
            nb: 'Fra',
        },
        tom: {
            nb: 'Til',
        },
    },
    hvem_passer_andre_alert: {
        tittel: {
            nb: 'Privat barnepass krever mer dokumentasjon',
        },
        innhold: {
            nb: 'Ved privat barnepass regnes du som arbeidsgiver. Vi kommer til å be deg om å legge ved avtalen du har med barnepasseren og kvittering for betaling.',
        },
    },
    hvem_passer_feilmelding: {
        nb: 'Du må velge hva slags pass [0] har.',
    },
    har_utgifter_feilmelding: {
        nb: 'Du må svare på om du har utgifter til pass av [0].',
    },
    utgifter_fom_feilmelding: {
        nb: 'Mangler fra-dato',
    },
    utgifter_tom_feilmelding: {
        nb: 'Mangler til-dato.',
    },
    feilmelding_tom_før_fom: {
        nb: 'Til-dato kan ikke være før fra-dato.',
    },

    startet_femte_radio: {
        header: { nb: 'Har [0] startet i 5. klasse når tiltaket ditt starter?' },
        alternativer: JaNeiTilTekst,
    },
    startet_femte_feilmelding: {
        nb: 'Du må svare på om [0] har begynt i 5. klasse.',
    },
    startet_femte_readmore_header: {
        nb: 'Som hovedregel gis det bare støtte for pass av barn til og med 4. klasse.',
    },
    startet_femte_readmore_innhold: { nb: 'Unntaket er hvis noe av dette er tilfelle:' },
    startet_femte_readmore_punktliste: {
        nb: [
            'barnet trenger vesentlig mer pleie eller hjelp enn det som er vanlig for jevnaldrende',
            'du har et tiltak hvor du må være borte fra hjemmet mer enn 10 timer per dag',
            'du har en arbeidsrettet aktivitet som krever at du jobber på kvelden, natta eller i helger',
        ],
    },
    årsak_ekstra_pass_radio: {
        header: {
            nb: 'Hva er årsaken til at [0] trenger pass etter at han har begynt i 5. klasse?',
        },
        alternativer: ÅrsakEkstraPassTilTekst,
    },
    årsak_ekstra_pass_feilmelding: {
        nb: 'Du må velge en årsak til at [0] trenger pass etter 5. klasse.',
    },
    mer_pleie_alert: {
        tittel: {
            nb: 'Behovet må dokumenteres med skriftlig uttalelse',
        },
        innhold: {
            nb: 'På neste siden vil du bli bedt om å dokumentere behovet for ekstra pleie/tilsyn ved legeerklæring eller annen uttalelse fra helsepersonell.',
        },
    },
    uvanlig_arbeidstid_alert: {
        nb: 'På neste siden vil du bli bedt om å dokumentere med avtale/bekreftelse fra tiltakssted/utdanningssted.',
    },
    ingen_av_disse_alert: {
        nb: 'Du kan fortsatt søke, men det kan hende du får avslag.',
    },
};
