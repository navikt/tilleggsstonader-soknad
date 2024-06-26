import { InlineLenke, TekstElement } from '../../typer/tekst';

interface DineBarnInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<InlineLenke>;
    hvilke_barn_spm: TekstElement<string>;
    hvilke_barn_feilmelding: TekstElement<string>;
    alert_barn_over_9: {
        tittel: TekstElement<string>;
        innhold: TekstElement<string>;
    };
    alert_kontantstøtte: TekstElement<string>;
    søke_for_andre_barn_les_mer_header: TekstElement<string>;
    søke_for_andre_barn_les_mer_innhold1: TekstElement<InlineLenke>;
}

export const dineBarnTekster: DineBarnInnhold = {
    tittel: {
        nb: 'Dine barn',
    },
    guide_innhold: {
        nb: [
            'Vi henter opplysninger om barn fra folkeregisteret. Du kan ikke legge til barn her.  Hvis noe er feil, må du  ',
            {
                tekst: 'melde fra til folkeregisteret',
                url: 'https://www.skatteetaten.no/person/folkeregister/',
                variant: 'neutral',
            },
            ' (åpnes i ny fane).',
        ],
    },
    hvilke_barn_spm: { nb: 'Hvilke barn søker du om støtte til pass for?' },
    hvilke_barn_feilmelding: { nb: 'Du må velge minst ett barn som du søker støtte til pass for.' },
    alert_barn_over_9: {
        tittel: {
            nb: 'Som hovedregel gis det bare støtte til pass av barn til og med 4. klasse',
        },
        innhold: {
            nb: 'Unntaket er hvis ditt barn trenger mer pass eller pleie enn jevnaldrende eller hvis du har ett tiltak/utdanning hvor du må være borte i lengre perioder eller på andre tidspunkter enn en vanlig arbeidsdag. Dette må dokumenteres.',
        },
    },
    alert_kontantstøtte: {
        nb: 'Fordi du har barn under 2 år, kommer vi til å sjekke om det utbetales kontantstøtte for barnet. Hvis det utbetales kontantstøtte trekker vi det fra utgiftene dine når vi beregner hva du skal få i støtte til pass av barn.',
    },
    søke_for_andre_barn_les_mer_header: {
        nb: 'Hvordan søke for barn som ikke vises her?',
    },
    søke_for_andre_barn_les_mer_innhold1: {
        nb: [
            'Hvis du ønsker å søke om støtte til pass av fosterbarn eller andre barn som ikke kan registreres i folkeregisteret, må du fylle ut ',
            {
                tekst: 'papirsøknad',
                url: 'https://tjenester.nav.no/soknadtilleggsstonader/app/start',
                variant: 'neutral',
            },
            ' (åpnes i ny fane).',
        ],
    },
};
