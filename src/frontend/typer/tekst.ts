export type Locale = 'nb';

export type TekstElement<T> = Record<Locale, T>;

export type LesMer = {
    header: string;
    innhold: string;
};

export type Radiogruppe<T> = {
    header: string;
    beskrivelse?: string;
    alternativer: (TekstElement<string> & { value: T })[];
};
