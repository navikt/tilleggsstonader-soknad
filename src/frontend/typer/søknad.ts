import { AnnenYtelse, Ytelse } from '../barnetilsyn/steg/2-hovedytelse/typer';

export interface Hovedytelse {
    ytelse: Exclude<Ytelse, 'annet'> | AnnenYtelse;
}

export interface Aktivitet {
    barnepassPgaUtdanning: JaNei;
}

export type JaNei = 'ja' | 'nei';
