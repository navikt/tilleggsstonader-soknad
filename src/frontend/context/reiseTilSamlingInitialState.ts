import {
    mockAktivitet,
    mockHovedytelse,
    mockReiseavstand,
    mockReisemåte,
    mockSamlinger,
} from '../mock/reiseTilSamlingMock';
import {
    AktivitetReiseTilSamling,
    TilleggsopplysningerAnnenAktivitet,
} from '../reiseTilSamling/typer/aktivitet';
import { DokumentasjonFelt } from '../typer/skjema';
import { Hovedytelse, Reiseavstand, Reisemåte, Samling } from '../typer/søknad';
import { erLokal } from '../utils/miljø';

export const initialHarBekreftet = (): boolean => erLokal();

export const initialHovedytelse = (): Hovedytelse | undefined =>
    erLokal() ? mockHovedytelse : undefined;

export const initialAktivitet = ():
    | Omit<AktivitetReiseTilSamling, 'tilleggsopplysningerAnnenAktivitet'>
    | undefined => (erLokal() ? mockAktivitet : undefined);

export const initialTilleggsopplysninger = (): TilleggsopplysningerAnnenAktivitet | undefined =>
    erLokal() ? mockAktivitet.tilleggsopplysningerAnnenAktivitet : undefined;

export const initialSamlinger = (): Samling[] =>
    erLokal() ? mockSamlinger : [{ _id: 1, lagret: false }];

export const initialReiseavstand = (): Reiseavstand =>
    erLokal() ? mockReiseavstand : { aktivitetsadresse: {} };

export const initialReisemåte = (): Reisemåte | undefined =>
    erLokal() ? mockReisemåte : undefined;

export const initialDokumentasjon = (): DokumentasjonFelt[] => [];
