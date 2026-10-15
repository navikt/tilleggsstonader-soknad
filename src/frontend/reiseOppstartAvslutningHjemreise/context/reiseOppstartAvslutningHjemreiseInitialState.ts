import {
    mockAdresserReiseOppstartAvslutningHjemreise,
    mockBarnOgHelseReiseOppstartAvslutningHjemreise,
    mockReiseinfoReiseOppstartAvslutningHjemreise,
} from '../../mock/reiseOppstartAvslutningHjemreiseMock';
import { mockHovedytelse } from '../../mock/reiseTilSamlingMock';
import { DokumentasjonFelt } from '../../typer/skjema';
import { Hovedytelse, AktivitetFelles } from '../../typer/søknad';
import { erLokal } from '../../utils/miljø';
import {
    AdresseReiseOppstartAvslutningHjemreise,
    BarnOgHelseReiseOppstartAvslutningHjemreise,
    ReiseInfoReiseOppstartAvslutningHjemreise,
} from '../typer/søknad';

const skalBrukeMockData = erLokal();

export const initialHarBekreftet = (): boolean => erLokal();

// TODO: legg til mock-data når det er behov for det under lokal utvikling
export const initialHovedytelse = (): Hovedytelse | undefined =>
    skalBrukeMockData ? mockHovedytelse : undefined;

export const initialAktivitet = (): AktivitetFelles | undefined => undefined;

export const initialAdresser = (): AdresseReiseOppstartAvslutningHjemreise | undefined =>
    skalBrukeMockData ? mockAdresserReiseOppstartAvslutningHjemreise : undefined;

export const initialBarnOgHelse = (): BarnOgHelseReiseOppstartAvslutningHjemreise | undefined =>
    skalBrukeMockData ? mockBarnOgHelseReiseOppstartAvslutningHjemreise : undefined;

export const initialReiser = (): ReiseInfoReiseOppstartAvslutningHjemreise[] =>
    skalBrukeMockData ? mockReiseinfoReiseOppstartAvslutningHjemreise : [{ _id: 1, lagret: false }];

export const initialDokumentasjon = (): DokumentasjonFelt[] => [];
