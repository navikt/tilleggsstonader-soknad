import { MAKS_FILSTØRRELSE_FORMATTERT } from '../components/Filopplaster/utils';
import { TekstElement } from '../typer/tekst';

export interface FilopplastingInnhold {
    last_opp_fil_knapp: TekstElement<string>;
    krav_dokumentasjon_overskrift: TekstElement<string>;
}

export const filopplastingTekster: FilopplastingInnhold = {
    last_opp_fil_knapp: {
        nb: 'Last opp fil',
    },

    krav_dokumentasjon_overskrift: {
        nb: 'Krav til dokumentasjonen',
    },
};
export const teksterFeilmeldinger: {
    enFil: TekstElement<string>;
    maksstørrelse: TekstElement<string>;
    filtype: TekstElement<string>;
    feiletOpplasting: TekstElement<string>;
} = {
    enFil: {
        nb: `Må laste opp en og en fil`,
    },
    maksstørrelse: {
        nb: `"[0]" er for stor (maksimal filstørrelse er ${MAKS_FILSTØRRELSE_FORMATTERT}).`,
    },
    filtype: {
        nb: '"[0]" – Ugyldig filtype.',
    },
    feiletOpplasting: {
        nb: 'Feilet opplasting av "[0]".',
    },
};
