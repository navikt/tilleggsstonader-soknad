import { EnumFelt } from './skjema';
import { AnnenYtelse, Ytelse } from '../barnetilsyn/steg/2-hovedytelse/typer';

export interface Hovedytelse {
    ytelse: EnumFelt<Ytelse | AnnenYtelse>;
}

export interface Aktivitet {
    utdanning: EnumFelt<JaNei>;
}

export type JaNei = 'JA' | 'NEI';

export interface Periode {
    fom: string;
    tom: string;
}

export interface Kvittering {
    mottattTidspunkt: string;
}
