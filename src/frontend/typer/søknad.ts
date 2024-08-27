import { AnnenAktivitetType } from './aktivitet';
import { Barnepass } from './barn';
import { DokumentasjonFelt, EnumFelt, EnumFlereValgFelt, SelectFelt, VerdiFelt } from './skjema';
import { Ytelse } from '../components/Hovedytelse/typer';

export type Søknad = SøknadPassAvBarn | SøknadLæremidler;

export interface SøknadPassAvBarn {
    hovedytelse: Hovedytelse | undefined;
    aktivitet: Aktivitet | undefined;
    barnMedBarnepass: Barnepass[];
    dokumentasjon: DokumentasjonFelt[];
}

export interface SøknadLæremidler {
    hovedytelse: Hovedytelse;
}

export interface Hovedytelse {
    ytelse: EnumFlereValgFelt<Ytelse>;
    arbeidOgOpphold: ArbeidOgOpphold;
}

export interface ArbeidOgOpphold {
    jobberIAnnetLand?: EnumFelt<JaNei>;
    jobbAnnetLand?: SelectFelt;
    harPengestøtteAnnetLand?: EnumFlereValgFelt<MottarPengestøtteTyper>;
    pengestøtteAnnetLand?: SelectFelt;

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
    aktiviteter: EnumFlereValgFelt<string> | undefined;
    annenAktivitet: EnumFelt<AnnenAktivitetType> | undefined;
    lønnetAktivitet: EnumFelt<JaNei> | undefined;
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
