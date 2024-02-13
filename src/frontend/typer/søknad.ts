import { EnumFelt } from './skjema';
import { Ytelse } from '../barnetilsyn/steg/2-hovedytelse/typer';

export interface Hovedytelse {
    ytelse: EnumFelt<Ytelse[]>;
}

export interface Aktivitet {
    utdanning: EnumFelt<JaNei>;
}

export type JaNei = 'JA' | 'NEI';

export interface Periode {
    fom: string;
    tom: string;
}
