import { RegisterAktivitet, RegisterAktivitetMedLabel } from '../../typer/registerAktivitet';
import { tilTekstligDato } from '../../utils/dato';

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
