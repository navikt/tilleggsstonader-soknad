import { PassType, ÅrsakBarnepass } from '../../typer/barn';
import { InlineLenke, LesMer, Radiogruppe, TekstElement } from '../../typer/tekst';

interface BarnepassInnhold {
    steg_tittel: TekstElement<string>;
    hvem_passer_radio: Radiogruppe<PassType>;
    hvem_passer_andre_alert: TekstElement<InlineLenke>;
    startet_femte_radio: Radiogruppe<boolean>;
    startet_femte_readmore: LesMer<string>;
    årsak_ekstra_pass_radio: Radiogruppe<ÅrsakBarnepass>;
    mer_pleie_alert: TekstElement<string>;
    uvanlig_arbeidstid_alert: TekstElement<string>;
}

export const PassTypeTilTekst: Record<PassType, TekstElement<string>> = {
    BARNEHAGE_SFO_AKS: { nb: 'Barnehage, skolefritidsordning (SFO) eller aktivitetsskole (AKS)' },
    ANDRE: {
        nb: 'Andre',
    },
};

export const ÅrsakEkstraPassTilTekst: Record<ÅrsakBarnepass, TekstElement<string>> = {
    TRENGER_MER_PASS_ENN_JEVNALDRENDE: {
        nb: 'Trenger mer pleie eller tilsyn enn det som er vanlig for jevnaldrende',
    },
    MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID: {
        nb: 'Jeg må være borte fra hjemmet i lengre perioder eller på andre tidspunkter enn en vanlig arbeidsdag ',
    },
};

export const barnepassTekster: BarnepassInnhold = {
    steg_tittel: {
        nb: 'Om pass av barn',
    },
    hvem_passer_radio: {
        header: { nb: 'Hvem skal passe [0]?' },
        beskrivelse: {
            nb: 'Vi spør om dette fordi vi trenger å vite hva slags dokumentasjon vi trenger å legge ved',
        },
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
        nb: [
            'Hvis du har privat barnepass, for eksempel dagmamma eller praktikant, må du legge ved avtalen du har med barnepasseren i tillegg til å dokumentere utgiftene dine. Ved privat barnepass er det ',
            {
                tekst: 'egne regler du kan lese om på Skatteetaten.',
                url: 'https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/familie-og-helse/barn/betalt-barnepass/',
            },
        ],
    },
    startet_femte_radio: {
        header: { nb: 'Har [0] startet i 5. klasse når tiltaket ditt starter?' },
        beskrivelse: { nb: 'Vi spør om dette fordi vi ser at [0] er over 9 år' },
        alternativer: [
            {
                value: true,
                label: { nb: 'Ja' },
            },
            {
                value: false,
                label: { nb: 'Nei' },
            },
        ],
    },
    startet_femte_readmore: {
        header: { nb: 'Som hovedregel gis det bare støtte for pass av barn til og med 4. klasse.' },
        innhold: {
            nb: 'Det kan gis støtte etter 4. klasse hvis: barnet trenger mer pleie eller hjelp enn det som er vanlig for jevnaldrende (må dokumenteres på neste side med legeerklæring) du har ett tiltak hvor du må være borte fra hjemmet i lengre perioder eller på andre tidspunkter enn en vanlig arbeidsdag (må dokumenteres fra utdanning/tiltakssted)',
        },
    },
    årsak_ekstra_pass_radio: {
        header: { nb: 'Hva er årsaken til at [0] trenger ekstra pass?' },
        beskrivelse: {
            nb: 'Vi spør om dette for å vite hvilken dokumentasjon du trenger å legge ved.',
        },
        alternativer: [
            {
                value: ÅrsakBarnepass.TRENGER_MER_PASS_ENN_JEVNALDRENDE,
                label: ÅrsakEkstraPassTilTekst.TRENGER_MER_PASS_ENN_JEVNALDRENDE,
            },
            {
                value: ÅrsakBarnepass.MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID,
                label: ÅrsakEkstraPassTilTekst.MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID,
            },
        ],
    },
    mer_pleie_alert: {
        nb: 'På neste siden vil du bli bedt om å dokumentere behovet for ekstra pleie/tilsyn ved legeerklæring.',
    },
    uvanlig_arbeidstid_alert: {
        nb: 'På neste siden vil du bli bedt om å dokumentere mer avtale fra arbeidsgiver.',
    },
};
