export enum Locale {
    NB = 'nb',
}

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

export type Punktliste = {
    tittel: TekstElement<string>;
    innhold: TekstElement<string[]>;
};

export type Radiogruppe<T> = {
    header: TekstElement<string>;
    beskrivelse?: TekstElement<string>;
    alternativer: { label: TekstElement<string>; value: T }[];
};

export type CheckboxGruppe<T extends string> = {
    header: TekstElement<string>;
    beskrivelse?: TekstElement<string>;
    alternativer: Record<T, TekstElement<string>>;
};

export type Vedlegg = {
    tittel: TekstElement<string>;
    liste_tittel?: TekstElement<string>;
    beskrivelse: TekstElement<string>;
    krav_til_dokumentasjon?: TekstElement<string | string[]>;
};
