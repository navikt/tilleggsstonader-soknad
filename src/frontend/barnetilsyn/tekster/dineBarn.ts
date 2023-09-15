import { TekstElement } from '../../typer/tekst';

interface DineBarnInnhold {
    steg_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    hvilke_barn_spm: TekstElement<string>;
}

export const dineBarnTekster: DineBarnInnhold = {
    steg_tittel: {
        nb: 'Dine barn',
    },
    guide_innhold: {
        nb: 'Vi henter opplysninger om barn fra folkeregisteret. Hvis du vil gjøre endringer, må du gjøre det på skatteetaten.no.',
    },
    hvilke_barn_spm: { nb: 'Hvilke barn søker du om støtte til pass for?' },
};
