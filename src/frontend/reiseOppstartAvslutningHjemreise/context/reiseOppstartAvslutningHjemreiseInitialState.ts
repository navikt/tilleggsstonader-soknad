import { DokumentasjonFelt } from '../../typer/skjema';
import { AktivitetFelles, Hovedytelse } from '../../typer/søknad';
import { erLokal } from '../../utils/miljø';

export const initialHarBekreftet = (): boolean => erLokal();

// TODO: legg til mock-data når det er behov for det under lokal utvikling
export const initialHovedytelse = (): Hovedytelse | undefined => undefined;

export const initialAktivitet = (): AktivitetFelles | undefined => undefined;

export const initialDokumentasjon = (): DokumentasjonFelt[] => [];
