import {
    mockAktivitet,
    mockHovedytelse,
    mockReiseavstand,
    mockReisemåte,
    mockSamlinger,
} from '../mock/reiseTilSamlingMock';
import { DokumentasjonFelt } from '../typer/skjema';
import { Aktivitet, Hovedytelse, Reiseavstand, Reisemåte, Samling } from '../typer/søknad';
import { erLokal } from '../utils/miljø';

export const initialHarBekreftet = (): boolean => erLokal();

export const initialHovedytelse = (): Hovedytelse | undefined =>
    erLokal() ? mockHovedytelse : undefined;

export const initialAktivitet = (): Aktivitet | undefined =>
    erLokal() ? mockAktivitet : undefined;

export const initialSamlinger = (): Samling[] =>
    erLokal() ? mockSamlinger : [{ _id: 1, lagret: false }];

export const initialReiseavstand = (): Reiseavstand =>
    erLokal() ? mockReiseavstand : { aktivitetsadresse: {} };

export const initialReisemåte = (): Reisemåte | undefined =>
    erLokal() ? mockReisemåte : undefined;

export const initialDokumentasjon = (): DokumentasjonFelt[] => [];
