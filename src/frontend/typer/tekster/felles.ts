import { TekstElement } from './tekst';

type FellesKeys = 'neste' | 'forrige';

export type FellesInnhold = Record<FellesKeys, TekstElement>;
