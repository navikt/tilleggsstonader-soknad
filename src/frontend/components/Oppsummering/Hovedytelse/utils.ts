import { EnumFlereValgFelt } from '../../../typer/skjema';

export const flervalgTilKommaStreng = (enumFlereValgFelt: EnumFlereValgFelt<unknown>) =>
    enumFlereValgFelt.verdier.map((verdi) => verdi.label).join(', ');
