import { Skjematype } from './skjematyper';

export const skjematypeTilSkjemaId: Record<Skjematype, string> = {
    [Skjematype.SØKNAD_PASS_AV_BARN]: 'NAV 11-12.15',
    [Skjematype.SØKNAD_LÆREMIDLER]: 'NAV 11-12.16',
    [Skjematype.SØKNAD_REISE_TIL_SAMLING]: 'NAV 11-12.17',
    [Skjematype.SØKNAD_STØTTE_TIL_REISE_OPPSTART_AVSLUTNING_HJEMREISE]: 'NAV 11-12.18',
};

export const skjematypeTilSkjemanavn: Record<Skjematype, string> = {
    [Skjematype.SØKNAD_PASS_AV_BARN]: 'Pass av barn',
    [Skjematype.SØKNAD_LÆREMIDLER]: 'Læremidler',
    [Skjematype.SØKNAD_REISE_TIL_SAMLING]: 'Reise til samling',
    // TODO: placeholder-navn, avklar endelig visningsnavn
    [Skjematype.SØKNAD_STØTTE_TIL_REISE_OPPSTART_AVSLUTNING_HJEMREISE]:
        'Reise ved oppstart, avslutning og hjemreise',
};
