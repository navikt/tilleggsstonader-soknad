import { DokumentasjonFelt } from '../../typer/skjema';
import { erLokal } from '../../utils/miljø';

export const initialHarBekreftet = (): boolean => erLokal();

export const initialDokumentasjon = (): DokumentasjonFelt[] => [];
