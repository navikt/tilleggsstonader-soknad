import { Stønadstype } from './stønadstyper';

export enum Skjemanavn {
    tilsyn_barn = 'Tilsyn barn',
}

export const skjemanavnTilId: Record<Skjemanavn, string> = {
    [Skjemanavn.tilsyn_barn]: 'NAV 11-12.15',
};

export const stønadstypeTilSkjemanavn: Record<Stønadstype, Skjemanavn> = {
    [Stønadstype.BARNETILSYN]: Skjemanavn.tilsyn_barn,
};
