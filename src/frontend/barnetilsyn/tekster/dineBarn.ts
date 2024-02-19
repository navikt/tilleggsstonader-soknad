import { TekstElement } from '../../typer/tekst';

interface DineBarnInnhold {
    steg_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    hvilke_barn_spm: TekstElement<string>;
    alert_barn_over_9: {
        tittel: TekstElement<string>;
        innhold: TekstElement<string>;
    };
}

export const dineBarnTekster: DineBarnInnhold = {
    steg_tittel: {
        nb: 'Dine barn',
    },
    guide_innhold: {
        nb: 'Vi henter opplysninger om barn fra folkeregisteret. Hvis du vil gjøre endringer, må du gjøre det på skatteetaten.no.',
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
};
