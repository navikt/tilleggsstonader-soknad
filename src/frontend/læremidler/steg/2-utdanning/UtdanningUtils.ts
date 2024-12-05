import { RegisterAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { AnnenUtdanningType } from '../../typer/søknad';

export const harValgtAktivitetPåVgsNivå = (
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined,
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel> | undefined,
    annenUtdanning: EnumFelt<AnnenUtdanningType> | undefined
) => {
    return (
        annenUtdanning?.verdi === AnnenUtdanningType.VIDEREGÅENDE ||
        valgteAktiviteter?.verdier.some(
            (aktivitet) => registerAktiviteter?.[aktivitet.verdi]?.erUtdanningPåVgsNivå ?? false
        )
    );
};
