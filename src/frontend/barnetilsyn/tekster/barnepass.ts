import { PassType, ÅrsakBarnepass } from '../../typer/barn';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

interface BarnepassInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    hvem_passer_radio: Radiogruppe<PassType>;
    hvem_passer_andre_alert: {
        tittel: TekstElement<string>;
        innhold: TekstElement<string>;
    };
    startet_femte_radio: Radiogruppe<JaNei>;
    startet_femte_readmore_header: TekstElement<string>;
    startet_femte_readmore_innhold: TekstElement<string>;
    startet_femte_readmore_punktliste: TekstElement<string[]>;
    årsak_ekstra_pass_radio: Radiogruppe<ÅrsakBarnepass>;
    mer_pleie_alert: {
        tittel: TekstElement<string>;
        innhold: TekstElement<string>;
    };
    uvanlig_arbeidstid_alert: TekstElement<string>;
    ingen_av_disse_alert: TekstElement<string>;
}

export const PassTypeTilTekst: Record<PassType, TekstElement<string>> = {
    BARNEHAGE_SFO_AKS: { nb: 'Barnehage, skolefritidsordning (SFO) eller aktivitetsskole (AKS)' },
    ANDRE: {
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
        alternativer: [
            {
                value: PassType.BARNEHAGE_SFO_AKS,
                label: PassTypeTilTekst.BARNEHAGE_SFO_AKS,
            },
            {
                value: PassType.ANDRE,
                label: PassTypeTilTekst.ANDRE,
            },
        ],
    },
    hvem_passer_andre_alert: {
        tittel: {
            nb: 'Privat barnepass krever mer dokumentasjon',
        },
        innhold: {
            nb: 'Ved privat barnepass regnes du som arbeidsgiver. Vi kommer til å be deg om å legge ved avtalen du har med barnepasseren og kvittering for betaling.',
        },
    },
    startet_femte_radio: {
        header: { nb: 'Har [0] startet i 5. klasse når tiltaket ditt starter?' },
        alternativer: [
            {
                value: 'JA',
                label: { nb: 'Ja' },
            },
            {
                value: 'NEI',
                label: { nb: 'Nei' },
            },
        ],
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
        header: { nb: 'Hva er årsaken til at [0] trenger pass etter han har begynt i 5. klasse?' },
        alternativer: [
            {
                value: ÅrsakBarnepass.TRENGER_MER_PASS_ENN_JEVNALDRENDE,
                label: ÅrsakEkstraPassTilTekst.TRENGER_MER_PASS_ENN_JEVNALDRENDE,
            },
            {
                value: ÅrsakBarnepass.MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID,
                label: ÅrsakEkstraPassTilTekst.MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID,
            },
            {
                value: ÅrsakBarnepass.INGEN_AV_DISSE,
                label: ÅrsakEkstraPassTilTekst.INGEN_AV_DISSE,
            },
        ],
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
