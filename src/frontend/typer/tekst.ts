export type Locale = 'nb';

export type TekstElement<T> = Record<Locale, T>;

export type LesMer = {
    header: string;
    innhold: string;
};

export type Radiogruppe = {
    header: string;
    beskrivelse?: string;
};

export type Radio = string;
