export type Locale = 'nb';

export type TekstElement<T> = Record<Locale, T>;

export type LesMer = {
    header: string;
    innhold: string | string[];
};

export type Radiogruppe<T> = {
    header: TekstElement<string>;
    beskrivelse?: TekstElement<string>;
    alternativer: { label: TekstElement<string>; value: T }[];
};
