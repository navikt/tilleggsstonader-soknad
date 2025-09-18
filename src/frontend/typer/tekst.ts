export enum Locale {
    NB = 'nb',
}

export type TekstElement<T> = Record<Locale, T>;

export type LesMer<T> = {
    header: TekstElement<string>;
    innhold: TekstElement<T>;
};

export type Lenke = {
    tekst: string;
    url: string;
    variant?: 'action' | 'neutral' | 'subtle';
};

export type StyledTekst = {
    tekst: string;
    style: 'bold' | 'italic' | 'normal';
};

export type InlineLenke = (string | StyledTekst | Lenke)[];

export type Punktliste = {
    tittel: TekstElement<string>;
    innhold: TekstElement<string[]>;
};

export type Radiogruppe<T extends string> = {
    header: TekstElement<string>;
    beskrivelse?: TekstElement<string>;
    alternativer: Alternativer<T>;
};

export type CheckboxGruppe<T extends string> = {
    legend: TekstElement<string>;
    beskrivelse?: TekstElement<string>;
    alternativer: Alternativer<T>;
};

export type Vedleggstekst = {
    tittel: TekstElement<string>;
    liste_tittel?: TekstElement<string>;
    beskrivelse: TekstElement<string>;
    krav_til_dokumentasjon?: TekstElement<string | string[]>;
};

export type Alternativer<T extends string> = Record<T, TekstElement<string>>;
