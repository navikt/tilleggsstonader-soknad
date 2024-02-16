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

export interface VerdiFelt<T> {
    verdi: T;
    label: string;
}

export interface DokumentasjonFelt {
    type: Vedleggstype;
    label: string;
    harSendtInn: boolean;
    opplastedeVedlegg: Dokument[];
    barnId?: string;
}

export interface Dokument {
    id: string;
    navn: string;
}

export enum Vedleggstype {
    UTGIFTER_PASS_SFO_AKS_BARNEHAGE = 'UTGIFTER_PASS_SFO_AKS_BARNEHAGE',
    UTGIFTER_PASS_ANNET = 'UTGIFER_PASS_ANNET',
    EKSTRA_PASS_BEHOV = 'EKSTRA_PASS_BEHOV',
}
