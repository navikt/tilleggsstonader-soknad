import { DokumentasjonFelt } from '../../typer/skjema';
import { Hovedytelse } from '../../typer/søknad';
import { erLokal } from '../../utils/miljø';
import { AktivitetReiseOppstartAvslutningHjemreise } from '../typer/aktivitet';

export const initialHarBekreftet = (): boolean => erLokal();

// TODO: legg til mock-data når det er behov for det under lokal utvikling
export const initialHovedytelse = (): Hovedytelse | undefined => undefined;

export const initialAktivitet = (): AktivitetReiseOppstartAvslutningHjemreise | undefined =>
    undefined;

export const initialDokumentasjon = (): DokumentasjonFelt[] => [];
