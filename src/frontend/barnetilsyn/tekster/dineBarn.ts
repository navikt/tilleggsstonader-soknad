import { InlineLenke, TekstElement } from '../../typer/tekst';

interface DineBarnInnhold {
    guide_innhold: TekstElement<InlineLenke>;
    hvilke_barn_spm: TekstElement<string>;
    alert_barn_over_9: {
        tittel: TekstElement<string>;
        innhold: TekstElement<string>;
    };
    alert_kontantstøtte: TekstElement<string>;
}

export const dineBarnTekster: DineBarnInnhold = {
    guide_innhold: {
        nb: [
            'Vi henter opplysninger om barn fra folkeregisteret. Du kan ikke legge til barn her. Hvis du vil melde fra om feil, må du gjøre det på ',
            { tekst: 'skatteetaten.no', url: 'https://www.skatteetaten.no/', variant: 'neutral' },
            '.',
        ],
    },
    hvilke_barn_spm: { nb: 'Hvilke barn søker du om støtte til pass for?' },
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
};
