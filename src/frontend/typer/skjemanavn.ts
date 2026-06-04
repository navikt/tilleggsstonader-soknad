import { Skjematype } from './skjematyper';

export const skjematypeTilSkjemaId: Record<Skjematype, string> = {
    [Skjematype.BARNETILSYN]: 'NAV 11-12.15',
    [Skjematype.LÆREMIDLER]: 'NAV 11-12.16',
    [Skjematype.REISE_TIL_SAMLING]: 'NAV 11-12.17',
};

export const skjematypeTilSkjemanavn: Record<Skjematype, string> = {
    [Skjematype.BARNETILSYN]: 'Pass av barn',
    [Skjematype.LÆREMIDLER]: 'Læremidler',
    [Skjematype.REISE_TIL_SAMLING]: 'Reise til samling',
};
