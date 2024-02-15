import { MAKS_FILSTØRRELSE_FORMATTERT } from '../components/Filopplaster/utils';
import { TekstElement } from '../typer/tekst';

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
