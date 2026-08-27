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

export type RadiogruppePåkrevd<T extends string> = Radiogruppe<T> & {
    feilmelding: TekstElement<string>;
};

export type SelectGruppe<T extends string> = {
    header: TekstElement<string>;
    beskrivelse?: TekstElement<string>;
    alternativer: Alternativer<T>;
};

export type SelectGruppePåkrevd<T extends string> = SelectGruppe<T> & {
    feilmelding: TekstElement<string>;
};

export type RadiogruppeMedUtvalg<T extends string> = {
    header: TekstElement<string>;
    beskrivelse?: TekstElement<string>;
    alternativer: Partial<Alternativer<T>>;
};

export type RadiogruppeMedUtvalgPåkrevd<T extends string> = RadiogruppeMedUtvalg<T> & {
    feilmelding: TekstElement<string>;
};

export type CheckboxGruppe<T extends string> = {
    legend: TekstElement<string>;
    beskrivelse?: TekstElement<string>;
    alternativer: Alternativer<T>;
};

export type CheckboxGruppePåkrevd<T extends string> = CheckboxGruppe<T> & {
    feilmelding: TekstElement<string>;
};

export type InputFelt = {
    label: TekstElement<string>;
    feilmelding: TekstElement<string>;
};

export type Datoperiode = {
    label: TekstElement<string>;
    fom: TekstElement<string>;
    tom: TekstElement<string>;
    feilmelding_fom?: TekstElement<string>;
    feilmelding_tom?: TekstElement<string>;
    feilmelding_tom_før_fom?: TekstElement<string>;
};

export type Vedleggstekst = {
    tittel: TekstElement<string>;
    liste_tittel?: TekstElement<string>;
    beskrivelse: TekstElement<string>;
    krav_til_dokumentasjon?: TekstElement<string | string[]>;
};

export type Alternativer<T extends string> = Record<T, TekstElement<string>>;
