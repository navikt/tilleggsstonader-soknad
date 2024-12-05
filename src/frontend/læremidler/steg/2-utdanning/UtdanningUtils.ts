import { RegisterAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { AnnenUtdanningType } from '../../typer/søknad';

export const harValgtAktivitetPåVgsNivå = (
    nyeValgteAktiviteter: EnumFlereValgFelt<string> | undefined,
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel> | undefined,
    annenUtdanning: EnumFelt<AnnenUtdanningType> | undefined
) => {
    if (!registerAktiviteter) {
        return false;
    }
    return nyeValgteAktiviteter?.verdier.some((aktivitet) => {
        return (
            annenUtdanning?.verdi === AnnenUtdanningType.VIDEREGÅENDE ||
            registerAktiviteter[aktivitet.verdi]?.erUtdanningPåVgsNivå
        );
    });
};
