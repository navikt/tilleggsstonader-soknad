import { DokumentasjonFelt } from '../../typer/skjema';
import { Hovedytelse } from '../../typer/søknad';
import { erLokal } from '../../utils/miljø';
import { mockHovedytelse } from '../mock/flyttingMock';

export const initialHarBekreftet = (): boolean => erLokal();

export const initialHovedytelse = (): Hovedytelse | undefined =>
    erLokal() ? mockHovedytelse : undefined;

export const initialDokumentasjon = (): DokumentasjonFelt[] => [];
