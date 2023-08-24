import { TekstElement } from '../../../typer/tekst';

type FellesKeys = 'neste' | 'forrige';

export type FellesInnhold = Record<FellesKeys, TekstElement>;
