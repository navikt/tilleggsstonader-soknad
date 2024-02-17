import { InlineLenke, TekstElement } from '../../typer/tekst';

interface DineBarnInnhold {
    steg_tittel: TekstElement<string>;
    guide_innhold: TekstElement<InlineLenke>;
    hvilke_barn_spm: TekstElement<string>;
}

export const dineBarnTekster: DineBarnInnhold = {
    steg_tittel: {
        nb: 'Dine barn',
    },
    guide_innhold: {
        nb: [
            'Vi henter opplysninger om barn fra folkeregisteret. Du kan ikke legge til barn her. Hvis du vil melde fra om feil, må du gjøre det på ',
            { tekst: 'skatteetaten.no', url: 'https://www.skatteetaten.no/', variant: 'neutral' },
            '.',
        ],
    },
    hvilke_barn_spm: { nb: 'Hvilke barn søker du om støtte til pass for?' },
};
