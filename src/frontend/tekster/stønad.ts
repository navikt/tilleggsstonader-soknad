import { Skjematype } from '../typer/skjematyper';
import { TekstElement } from '../typer/tekst';

interface StønadInnhold {
    tittelHtml: Record<Skjematype, TekstElement<string>>;
}

export const teksterStønad: StønadInnhold = {
    tittelHtml: {
        [Skjematype.SØKNAD_PASS_AV_BARN]: {
            nb: 'Søknad om støtte til pass av barn',
        },
        [Skjematype.SØKNAD_LÆREMIDLER]: {
            nb: 'Søknad om støtte til læremidler',
        },
        [Skjematype.SØKNAD_REISE_TIL_SAMLING]: {
            nb: 'Søknad om støtte til reise til samling',
        },
        // TODO: placeholder-tittel, avklar endelig tekst
        [Skjematype.SØKNAD_STØTTE_TIL_REISE_OPPSTART_AVSLUTNING_HJEMREISE]: {
            nb: 'Søknad om støtte til reise ved oppstart, avslutning og hjemreise',
        },
    },
};
