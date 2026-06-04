import { Skjematype } from '../typer/skjematyper';
import { TekstElement } from '../typer/tekst';

interface StønadInnhold {
    tittelHtml: Record<Skjematype, TekstElement<string>>;
}

export const teksterStønad: StønadInnhold = {
    tittelHtml: {
        BARNETILSYN: {
            nb: 'Søknad om støtte til pass av barn',
        },
        LÆREMIDLER: {
            nb: 'Søknad om støtte til læremidler',
        },
        REISE_TIL_SAMLING: {
            nb: 'Søknad om støtte til reise til samling',
        },
    },
};
