export type Locale = 'nb';

export type TekstElement = Record<Locale, string>;

type FellesKeys = 'neste' | 'forrige';

export type FellesInnhold = Record<FellesKeys, TekstElement>;
