import { TekstElement } from '../../../typer/tekst';

type PersonaliaKeys = 'steg_tittel' | 'innhold_tittel' | 'guide_innhold';

export type PersonaliaInnhold = Record<PersonaliaKeys, TekstElement>;
