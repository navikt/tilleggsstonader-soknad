import { RegisterAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { EnumFlereValgFelt } from '../../../typer/skjema';

export const harValgtRegisterAktivitetPåVgsNivåEllerAnnet = (
    nyeValgteAktiviteter: EnumFlereValgFelt<string>,
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel> | undefined
) => {
    if (!registerAktiviteter) {
        return false;
    }
    return nyeValgteAktiviteter?.verdier.some(
        (aktivitet) =>
            aktivitet.verdi === 'ANNET' || registerAktiviteter[aktivitet.verdi].erUtdanningPåVgsNivå
    );
};

export const harValgtRegisterAktivitetPåVgsNivå = (
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined,
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel> | undefined
) => {
    if (!registerAktiviteter) {
        return false;
    }
    return valgteAktiviteter?.verdier.some(
        (aktivitet) =>
            aktivitet.verdi !== 'ANNET' && registerAktiviteter[aktivitet.verdi].erUtdanningPåVgsNivå
    );
};
