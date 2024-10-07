import { AnnenAktivitetType } from '../../../typer/aktivitet';
import { RegisterAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';

export const skalTaStillingTilAnnenAktivitet = (
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined
): boolean => valgteAktiviteter?.verdier.some((verdi) => verdi.verdi === 'ANNET') ?? false;

export const skalTaStillingTilLønnetTiltak = (
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined,
    annenAktivitet: EnumFelt<AnnenAktivitetType> | undefined,
    registerAktivitet: Record<string, RegisterAktivitetMedLabel> | undefined
): boolean => {
    if (annenAktivitet?.verdi === 'TILTAK') {
        return true;
    }
    if (!registerAktivitet || !valgteAktiviteter) return false;
    return valgteAktiviteter.verdier.some((valgtAktivitet) => {
        const aktivitet = registerAktivitet[valgtAktivitet.verdi];
        return aktivitet && !aktivitet.erUtdanning;
    });
};

export const skalTaStillingTilRegisterAktiviteter = (
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>
): boolean => Object.keys(registerAktiviteter).length > 0;
