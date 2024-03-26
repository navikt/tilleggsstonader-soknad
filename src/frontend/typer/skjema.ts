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
    harSendtInn: boolean;
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

export enum Vedleggstype {
    UTGIFTER_PASS_SFO_AKS_BARNEHAGE = 'UTGIFTER_PASS_SFO_AKS_BARNEHAGE',
    UTGIFTER_PASS_ANNET = 'UTGIFTER_PASS_ANNET',
    TRENGER_MER_PASS_ENN_JEVNALDRENDE = 'TRENGER_MER_PASS_ENN_JEVNALDRENDE',
    MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID = 'MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID',
}
