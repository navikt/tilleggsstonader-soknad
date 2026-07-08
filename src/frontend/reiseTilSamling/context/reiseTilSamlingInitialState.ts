import {
    mockAktivitet,
    mockHovedytelse,
    mockReiseavstand,
    mockReisemåte,
    mockSamlinger,
} from '../../mock/reiseTilSamlingMock';
import { DokumentasjonFelt } from '../../typer/skjema';
import { Hovedytelse, Reiseavstand, Reisemåte, Samling } from '../../typer/søknad';
import { erLokal } from '../../utils/miljø';
import { AktivitetReiseTilSamling } from '../typer/aktivitet';

export const initialHarBekreftet = (): boolean => erLokal();

export const initialHovedytelse = (): Hovedytelse | undefined =>
    erLokal() ? mockHovedytelse : undefined;

export const initialAktivitet = (): AktivitetReiseTilSamling =>
    erLokal()
        ? mockAktivitet
        : {
              annenAktivitetTypeUtdanning: undefined,
              aktiviteter: undefined,
              annenAktivitet: undefined,
              lønnetAktivitet: undefined,
              tilleggsopplysningerAnnenAktivitet: undefined,
          };

export const initialSamlinger = (): Samling[] =>
    erLokal() ? mockSamlinger : [{ _id: 1, lagret: false }];

export const initialReiseavstand = (): Reiseavstand =>
    erLokal() ? mockReiseavstand : { aktivitetsadresse: {} };

export const initialReisemåte = (): Reisemåte | undefined =>
    erLokal() ? mockReisemåte : undefined;

export const initialDokumentasjon = (): DokumentasjonFelt[] => [];
