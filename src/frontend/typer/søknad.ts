import { EnumFelt, EnumFlereValgFelt, VerdiFelt } from './skjema';
import { Ytelse } from '../barnetilsyn/steg/2-hovedytelse/typer';

export interface Hovedytelse {
    ytelse: EnumFlereValgFelt<Ytelse>;
    arbeidOgOpphold: ArbeidOgOpphold;
}

export interface ArbeidOgOpphold {
    jobberIAnnetLandEnnNorge?: EnumFelt<JaNei>;
    hvilketLandJobberIAnnetLandEnnNorge?: VerdiFelt<string>;
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
