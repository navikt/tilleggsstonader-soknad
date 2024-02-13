export type Locale = 'nb';

export type TekstElement<T> = Record<Locale, T>;

export type LesMer<T> = {
    header: TekstElement<string>;
    innhold: TekstElement<T>;
};

type Lenke = {
    tekst: string;
    url: string;
    variant?: 'action' | 'neutral' | 'subtle';
};

export type InlineLenke = (string | Lenke)[];

export type Radiogruppe<T> = {
    header: TekstElement<string>;
    beskrivelse?: TekstElement<string>;
    alternativer: { label: TekstElement<string>; value: T }[];
};
