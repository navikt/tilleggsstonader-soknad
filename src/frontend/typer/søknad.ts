import { EnumFelt, EnumFlereValgFelt, SelectFelt, VerdiFelt } from './skjema';
import { Ytelse } from '../barnetilsyn/steg/2-hovedytelse/typer';

export interface Hovedytelse {
    ytelse: EnumFlereValgFelt<Ytelse>;
    arbeidOgOpphold: ArbeidOgOpphold;
}

export interface ArbeidOgOpphold {
    jobberIAnnetLand?: EnumFelt<JaNei>;
    jobbAnnetLand?: VerdiFelt<string>;
    harPengestøtteAnnetLand?: EnumFlereValgFelt<MottarPengestøtteTyper>;
    pengestøtteAnnetLand?: VerdiFelt<string>;

    harOppholdUtenforNorgeSiste12mnd?: EnumFelt<JaNei>;
    oppholdUtenforNorgeSiste12mnd: OppholdUtenforNorge[];

    harOppholdUtenforNorgeNeste12mnd?: EnumFelt<JaNei>;
    oppholdUtenforNorgeNeste12mnd: OppholdUtenforNorge[];
}

export interface OppholdUtenforNorge {
    _id: number; // for å kunne lenke og vise riktig feilmelding - lagres ikke i bakend
    lagret: boolean;
    land?: SelectFelt;
    årsak?: EnumFlereValgFelt<ÅrsakOppholdUtenforNorge>;
    fom?: VerdiFelt<string>;
    tom?: VerdiFelt<string>;
}

export interface Aktivitet {
    utdanning: EnumFelt<JaNei>;
}

export type JaNei = 'JA' | 'NEI';

export type MottarPengestøtteTyper = 'SYKEPENGER' | 'PENSJON' | 'ANNEN_PENGESTØTTE' | 'MOTTAR_IKKE';

export type ÅrsakOppholdUtenforNorge =
    | 'JOBB'
    | 'STUDIER'
    | 'MEDISINSK_BEHANDLING'
    | 'FERIE'
    | 'FAMILIE_BESØK'
    | 'ANNET';

export interface Periode {
    fom: string;
    tom: string;
}

export interface Kvittering {
    mottattTidspunkt: string;
}
