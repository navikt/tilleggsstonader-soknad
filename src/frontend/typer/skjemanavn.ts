import { Skjematype } from './skjematyper';

export const skjematypeTilSkjemaId: Record<Skjematype, string> = {
    [Skjematype.SØKNAD_BARNETILSYN]: 'NAV 11-12.15',
    [Skjematype.SØKNAD_LÆREMIDLER]: 'NAV 11-12.16',
    [Skjematype.SØKNAD_REISE_TIL_SAMLING]: 'NAV 11-12.17',
};

export const skjematypeTilSkjemanavn: Record<Skjematype, string> = {
    [Skjematype.SØKNAD_BARNETILSYN]: 'Pass av barn',
    [Skjematype.SØKNAD_LÆREMIDLER]: 'Læremidler',
    [Skjematype.SØKNAD_REISE_TIL_SAMLING]: 'Reise til samling',
};
