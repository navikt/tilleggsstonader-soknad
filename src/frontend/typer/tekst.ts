export type Locale = 'nb';

export type TekstElement<T> = Record<Locale, T>;

export type LesMer<T> = {
    header: TekstElement<string>;
    innhold: TekstElement<T>;
};

type Lenke = {
    tekst: string;
    url: string;
};

export type InlineLenke = (string | Lenke)[];

export type Radiogruppe<T> = {
    header: TekstElement<string>;
    beskrivelse?: TekstElement<string>;
    alternativer: { label: TekstElement<string>; value: T }[];
};

export type Vedlegg = {
    tittel: TekstElement<string>;
    beskrivelse: TekstElement<string>;
    krav_til_dokumentasjon: TekstElement<string | string[]>;
};
