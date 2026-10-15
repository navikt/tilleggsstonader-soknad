import {
    mockAdresserReiseOppstartAvslutningHjemreise,
    mockBarnOgHelseReiseOppstartAvslutningHjemreise,
} from '../../mock/reiseOppstartAvslutningHjemreiseMock';
import { mockHovedytelse } from '../../mock/reiseTilSamlingMock';
import { DokumentasjonFelt } from '../../typer/skjema';
import { AktivitetFelles, Hovedytelse } from '../../typer/søknad';
import { erLokal } from '../../utils/miljø';
import {
    AdresseReiseOppstartAvslutningHjemreise,
    BarnOgHelseReiseOppstartAvslutningHjemreise,
} from '../typer/søknad';

export const initialHarBekreftet = (): boolean => erLokal();

// TODO: legg til mock-data når det er behov for det under lokal utvikling
export const initialHovedytelse = (): Hovedytelse | undefined =>
    erLokal() ? mockHovedytelse : undefined;

export const initialAktivitet = (): AktivitetFelles | undefined => undefined;

export const initialAdresser = (): AdresseReiseOppstartAvslutningHjemreise | undefined =>
    erLokal() ? mockAdresserReiseOppstartAvslutningHjemreise : undefined;

export const initialBarnOgHelse = (): BarnOgHelseReiseOppstartAvslutningHjemreise | undefined =>
    erLokal() ? mockBarnOgHelseReiseOppstartAvslutningHjemreise : undefined;

export const initialDokumentasjon = (): DokumentasjonFelt[] => [];
