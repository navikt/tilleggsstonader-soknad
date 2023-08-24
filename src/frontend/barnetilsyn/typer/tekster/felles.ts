import { TekstElement } from '../../../typer/tekst';

type FellesKeys = 'neste' | 'forrige' | 'banner';

export type FellesInnhold = Record<FellesKeys, TekstElement>;
