import { Stønadstype } from './stønadstyper';

export const stønadstypeTilSkjemaId: Record<Stønadstype, string> = {
    [Stønadstype.BARNETILSYN]: 'NAV 11-12.15',
};

export const stønadstypeTilSkjemanavn: Record<Stønadstype, string> = {
    [Stønadstype.BARNETILSYN]: 'Pass av barn',
};
