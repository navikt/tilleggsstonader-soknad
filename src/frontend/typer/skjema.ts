export interface EnumFelt<T> {
    label: string;
    verdi: T;
    svarTekst: string;
    alternativer: string[];
}

export interface DokumentasjonFelt {
    type: Vedleggstype;
    label: string;
    harSendtInn: boolean;
    opplastedeVedlegg: Dokument[];
}

// Disse må synke med Vedleggstype i kontrakter
export enum Vedleggstype {
    EKSEMPEL = 'EKSEMPEL',
}

export interface Dokument {
    id: string;
    navn: string;
}
