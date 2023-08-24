import { Tekster } from './tekst';

type FellesKeys = 'neste' | 'forrige';

export type FellesInnhold = Record<FellesKeys, Tekster>;
