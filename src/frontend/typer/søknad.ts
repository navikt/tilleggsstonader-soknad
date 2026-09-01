import { AnnenAktivitetType } from './aktivitet';
import { DokumentasjonFelt, EnumFelt, EnumFlereValgFelt, SelectFelt, VerdiFelt } from './skjema';
import { Ytelse } from '../components/Hovedytelse/typer';
import { Utdanning } from '../læremidler/typer/søknad';
import { Barnepass } from '../passAvBarn/typer/barnepass';
import { AktivitetReiseOppstartAvslutningHjemreise } from '../reiseOppstartAvslutningHjemreise/typer/aktivitet';
import { AktivitetReiseTilSamling } from '../reiseTilSamling/typer/aktivitet';

export type Søknad =
    | SøknadPassAvBarn
    | SøknadLæremidler
    | SøknadReiseTilSamling
    | SøknadReiseOppstartAvslutningHjemreise;

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
    avreiseadresse?: Avreiseadresse;
    reisemåte?: Reisemåte;
    dokumentasjon: DokumentasjonFelt[];
    søknadMetadata: SøknadMetadata;
}

// Skjelett - flere felt legges til etter hvert som resten av flyten bygges ut
export interface SøknadReiseOppstartAvslutningHjemreise {
    hovedytelse: Hovedytelse | undefined;
    aktivitet: AktivitetReiseOppstartAvslutningHjemreise | undefined;
    dokumentasjon: DokumentasjonFelt[];
    søknadMetadata: SøknadMetadata;
}

export type KanBenytteEgenBil = 'JA' | 'NEI' | 'NEI_SITTER_PÅ_MED_ANDRE';

export type KanIkkeReiseMedOffentligTransportBegrunnelser =
    'DÅRLIG_TRANSPORTTILBUD' | 'HELSEMESSIGE_ÅRSAKER' | 'LEVERING_HENTING_I_BARNEHAGE';

export type KanIkkeBenytteEgenBilBegrunnelser =
    'HAR_IKKE_BIL_ELLER_FØRERKORT' | 'HELSEMESSIGE_ÅRSAKER' | 'ANNET';

export type DrivstoffType = 'BENSIN' | 'DIESEL' | 'ELBIL' | 'HYBRID' | 'HYDROGEN';

export interface Reisemåte {
    kanReiseMedOffentligTransport?: EnumFelt<JaNei>;
    kanIkkeReiseMedOffentligTransportBegrunnelser?: EnumFlereValgFelt<KanIkkeReiseMedOffentligTransportBegrunnelser>;
    barnehageGateadresse?: VerdiFelt<string>;
    barnehagePostnummer?: VerdiFelt<string>;
    totalUtgifterOffentligTransport?: VerdiFelt<string>;
    kanBenytteEgenBil?: EnumFelt<KanBenytteEgenBil>;
    betalerForReiseSelv?: EnumFelt<JaNei>;
    kanIkkeBenytteEgenBilBegrunnelser?: EnumFlereValgFelt<KanIkkeBenytteEgenBilBegrunnelser>;
    ønskerDekketUtgifterForDrosje?: EnumFelt<JaNei>;
    harTTKort?: EnumFelt<JaNei>;
    reiseMedBilUtgifter?: {
        drivstoffType?: EnumFelt<DrivstoffType>;
        bompenger?: VerdiFelt<string>;
        ferge?: VerdiFelt<string>;
        piggdekkavgift?: VerdiFelt<string>;
    };
}

export interface Adresse {
    land?: SelectFelt;
    gateadresse?: VerdiFelt<string>;
    postnummer?: VerdiFelt<string>;
    poststed?: VerdiFelt<string>;
}

export interface Avreiseadresse {
    skalReiseFraFolkeregistrertAdresse?: EnumFelt<JaNei>;
    adresseDetSkalReisesFra?: Adresse;
}

export interface Samling {
    _id: number; // for å kunne lenke og vise riktig feilmelding - lagres ikke i backend
    _brukSammeAdresseSomForrige?: EnumFelt<JaNei>; // for å kunne støtte å bruke samme adresse som forrige samling - lagres ikke i backend
    lagret: boolean;
    fom?: VerdiFelt<string>;
    tom?: VerdiFelt<string>;
    erObligatorisk?: EnumFelt<JaNei>;
    harBruktEkstraReiseDager?: EnumFelt<JaNei>;
    adresse?: Adresse;
    antallKilometerEnVei?: VerdiFelt<string>;
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
    'JOBB' | 'STUDIER' | 'MEDISINSK_BEHANDLING' | 'FERIE' | 'FAMILIE_BESØK' | 'ANNET';

export interface Periode {
    fom: string;
    tom: string;
}

export interface Kvittering {
    mottattTidspunkt: string;
}
