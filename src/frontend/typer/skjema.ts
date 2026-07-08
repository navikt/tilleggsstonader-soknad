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

export type Vedleggstype =
    | VedleggstypePassAvBarn
    | VedleggstypeLæremidler
    | VedleggstypeKjøreliste
    | VedleggstypeReiseTilSamling;

const SKRIFTLIG_UTTALELSE_HELSEPERSONELL = 'SKRIFTLIG_UTTALELSE_HELSEPERSONELL';

export const VedleggstypePassAvBarn = {
    UTGIFTER_PASS_SFO_AKS_BARNEHAGE: 'UTGIFTER_PASS_SFO_AKS_BARNEHAGE',
    UTGIFTER_PASS_PRIVAT: 'UTGIFTER_PASS_PRIVAT',
    SKRIFTLIG_UTTALELSE_HELSEPERSONELL,
    TILTAKSSTED_ELLER_UTDANNINGSSTED: 'TILTAKSSTED_ELLER_UTDANNINGSSTED',
} as const;
export type VedleggstypePassAvBarn =
    (typeof VedleggstypePassAvBarn)[keyof typeof VedleggstypePassAvBarn];

export const VedleggstypeLæremidler = {
    DOKUMENTASJON_FUNKSJONSNEDSETTELSE: 'DOKUMENTASJON_FUNKSJONSNEDSETTELSE',
    UTGIFTER_LÆREMIDLER: 'UTGIFTER_LÆREMIDLER',
} as const;
export type VedleggstypeLæremidler =
    (typeof VedleggstypeLæremidler)[keyof typeof VedleggstypeLæremidler];

export const VedleggstypeKjøreliste = {
    PARKERINGSUTGIFT: 'PARKERINGSUTGIFT',
} as const;
export type VedleggstypeKjøreliste =
    (typeof VedleggstypeKjøreliste)[keyof typeof VedleggstypeKjøreliste];

export const VedleggstypeReiseTilSamling = {
    BEKREFTELSE_SAMLINGER: 'BEKREFTELSE_SAMLINGER',
    UTGIFTER_OFFENTLIG_TRANSPORT: 'UTGIFTER_OFFENTLIG_TRANSPORT',
    SKRIFTLIG_UTTALELSE_HELSEPERSONELL,
} as const;
export type VedleggstypeReiseTilSamling =
    (typeof VedleggstypeReiseTilSamling)[keyof typeof VedleggstypeReiseTilSamling];
