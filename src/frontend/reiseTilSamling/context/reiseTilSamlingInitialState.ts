import {
    mockAktivitet,
    mockHovedytelse,
    mockAvreiseadresse,
    mockSamlinger,
} from '../../mock/reiseTilSamlingMock';
import { DokumentasjonFelt } from '../../typer/skjema';
import { Avreiseadresse, Hovedytelse, Samling } from '../../typer/søknad';
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

export const initialAvreiseadresse = (): Avreiseadresse => (erLokal() ? mockAvreiseadresse : {});

export const initialDokumentasjon = (): DokumentasjonFelt[] => [];
