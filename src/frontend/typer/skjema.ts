import { Barn } from './barn';

export interface EnumFelt<T> {
    label: string;
    verdi: T;
    svarTekst: string;
    alternativer: string[];
}

export interface EnumFlereValgFelt<T> {
    label: string;
    verdier: VerdiFelt<T>[];
    alternativer: string[];
}

export interface SelectFelt {
    label: string;
    verdi: string;
    svarTekst: string;
}

export interface VerdiFelt<T> {
    verdi: T;
    label: string;
}

export interface DokumentasjonFelt {
    type: Vedleggstype;
    label: string;
    opplastedeVedlegg: Dokument[];
    barnId?: string;
}

export interface Dokumentasjonsbehov {
    type: Vedleggstype;
    barn?: Barn;
}

export interface Dokument {
    id: string;
    navn: string;
}

// OBS: Ikke ha duplikat av enum-typer.
export type Vedleggstype = VedleggstypePassAvBarn | VedleggstypeLæremidler;

export enum VedleggstypePassAvBarn {
    UTGIFTER_PASS_SFO_AKS_BARNEHAGE = 'UTGIFTER_PASS_SFO_AKS_BARNEHAGE',
    UTGIFTER_PASS_PRIVAT = 'UTGIFTER_PASS_PRIVAT',
    SKRIFTLIG_UTTALELSE_HELSEPERSONELL = 'SKRIFTLIG_UTTALELSE_HELSEPERSONELL',
    TILTAKSSTED_ELLER_UTDANNINGSSTED = 'TILTAKSSTED_ELLER_UTDANNINGSSTED',
}

export enum VedleggstypeLæremidler {
    DOKUMENTASJON_FUNKSJONSNEDSETTELSE = 'DOKUMENTASJON_FUNKSJONSNEDSETTELSE',
    UTGIFTER_LÆREMIDLER = 'UTGIFTER_LÆREMIDLER',
}
