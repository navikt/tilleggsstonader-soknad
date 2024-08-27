import { Stønadstype } from '../typer/stønadstyper';
import { TekstElement } from '../typer/tekst';

interface StønadInnhold {
    tittelHtml: Record<Stønadstype, TekstElement<string>>;
}

export const teksterStønad: StønadInnhold = {
    tittelHtml: {
        BARNETILSYN: {
            nb: 'Søknad om støtte til pass av barn',
        },
        LÆREMIDLER: {
            nb: 'Søknad om støtte til læremidler',
        },
    },
};
