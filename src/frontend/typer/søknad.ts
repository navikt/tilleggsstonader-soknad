import { AnnenYtelse, Ytelse } from '../barnetilsyn/steg/2-hovedytelse/typer';

export interface Hovedytelse {
    ytelse: Exclude<Ytelse, 'ANNET'> | AnnenYtelse;
}

export interface Aktivitet {
    utdanning: JaNei;
}

export type JaNei = 'JA' | 'NEI';

export interface Periode {
    fom: string;
    tom: string;
}
