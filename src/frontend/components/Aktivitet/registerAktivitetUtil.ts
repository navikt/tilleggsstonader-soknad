import { RegisterAktivitet, RegisterAktivitetMedLabel } from '../../typer/registerAktivitet';
import { EnumFlereValgFelt } from '../../typer/skjema';
import { tilTekstligDato } from '../../utils/datoUtils';

export const mapTilRegisterAktiviteterObjektMedLabel = (
    registerAktiviteter: RegisterAktivitet[]
): Record<string, RegisterAktivitetMedLabel> => {
    return registerAktiviteter.reduce(
        (acc, curr) => ({
            ...acc,
            [curr.id]: {
                ...curr,
                label: `${curr.typeNavn}: ${tilTekstligDato(curr.fom)} - ${curr.tom ? tilTekstligDato(curr.tom) : ''}`,
            },
        }),
        {} as Record<string, RegisterAktivitetMedLabel>
    );
};

export const skalTaStillingTilAnnenAktivitet = (
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined
): boolean => valgteAktiviteter?.verdier.some((verdi) => verdi.verdi === 'ANNET') ?? false;

export const skalTaStillingTilRegisterAktiviteter = (
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>
): boolean => Object.keys(registerAktiviteter).length > 0;
