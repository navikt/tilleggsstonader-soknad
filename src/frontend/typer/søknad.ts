import { AnnenAktivitetType } from './aktivitet';
import { DokumentasjonFelt, EnumFelt, EnumFlereValgFelt, SelectFelt, VerdiFelt } from './skjema';
import { Barnepass } from '../barnetilsyn/typer/barnepass';
import { Ytelse } from '../components/Hovedytelse/typer';
import { Utdanning } from '../læremidler/typer/søknad';
import { AktivitetReiseTilSamling } from '../reiseTilSamling/typer/aktivitet';

export type Søknad = SøknadPassAvBarn | SøknadLæremidler | SøknadReiseTilSamling;

export interface SøknadPassAvBarn {
    hovedytelse: Hovedytelse | undefined;
    aktivitet: AktivitetFelles | undefined;
    barnMedBarnepass: Barnepass[];
    dokumentasjon: DokumentasjonFelt[];
    søknadMetadata: SøknadMetadata;
}

export interface SøknadLæremidler {
    hovedytelse: Hovedytelse | undefined;
    utdanning: Utdanning | undefined;
    dokumentasjon: DokumentasjonFelt[];
    søknadMetadata: SøknadMetadata;
}

export interface SøknadReiseTilSamling {
    hovedytelse: Hovedytelse | undefined;
    aktivitet: AktivitetReiseTilSamling | undefined;
    samlinger: Samling[];
    reiseavstand?: Reiseavstand;
    reisemåte?: Reisemåte;
    dokumentasjon: DokumentasjonFelt[];
    søknadMetadata: SøknadMetadata;
}

export type KanBenytteEgenBil = 'JA' | 'NEI' | 'NEI_SITTER_PÅ_MED_ANDRE';

export interface Reisemåte {
    kanReiseMedOffentligTransport?: EnumFelt<JaNei>;
    kanIkkeReiseMedOffentligTransportBegrunnelser?: EnumFlereValgFelt<string>;
    totalUtgifterOffentligTransport?: VerdiFelt<string>;
    kanBenytteEgenBil?: EnumFelt<KanBenytteEgenBil>;
    betalerForReiseSelv?: EnumFelt<JaNei>;
    kanIkkeBenytteEgenBilBegrunnelser?: EnumFlereValgFelt<string>;
    ønskerDekketUtgifterForDrosje?: EnumFelt<JaNei>;
    harTTKort?: EnumFelt<JaNei>;
    reiseMedBilUtgifter?: {
        drivstoffType?: EnumFelt<string>;
        bompenger?: VerdiFelt<string>;
        ferge?: VerdiFelt<string>;
        piggdekkavgift?: VerdiFelt<string>;
    };
}

export interface Aktivitetsadresse {
    land?: SelectFelt;
    gateadresse?: VerdiFelt<string>;
    postnummer?: VerdiFelt<string>;
    poststed?: VerdiFelt<string>;
}

export interface Avreiseadresse {
    land?: SelectFelt;
    gateadresse?: VerdiFelt<string>;
    postnummer?: VerdiFelt<string>;
    poststed?: VerdiFelt<string>;
}

export interface Reiseavstand {
    skalReiseFraFolkeregistrertAdresse?: EnumFelt<JaNei>;
    adresseDetSkalReisesFra?: Avreiseadresse;
    antallKilometerEnVei?: VerdiFelt<string>;
    aktivitetsadresse: Aktivitetsadresse;
}

export interface Samling {
    _id: number; // for å kunne lenke og vise riktig feilmelding - lagres ikke i backend
    lagret: boolean;
    fom?: VerdiFelt<string>;
    tom?: VerdiFelt<string>;
    erObligatorisk?: EnumFelt<JaNei>;
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

export interface AktivitetFelles {
    aktiviteter: EnumFlereValgFelt<string> | undefined;
    annenAktivitet: EnumFelt<AnnenAktivitetType> | undefined;
    lønnetAktivitet: EnumFelt<JaNei> | undefined;
}

export interface SøknadMetadata {
    søknadFrontendGitHash: string | undefined;
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
