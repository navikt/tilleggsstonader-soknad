import { EnumFelt, EnumFlereValgFelt } from './skjema';
import { Ytelse } from '../barnetilsyn/steg/2-hovedytelse/typer';

export interface Hovedytelse {
    ytelse: EnumFlereValgFelt<Ytelse>;
    boddSammenhengende: EnumFelt<JaNei> | undefined;
    planleggerBoINorgeNeste12mnd: EnumFelt<JaNei> | undefined;
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
