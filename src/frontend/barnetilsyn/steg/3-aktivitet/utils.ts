import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

import { RegisterAktivitetMedLabel, RegisterAktivitet } from '../../../typer/registerAktivitet';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { tilDato } from '../../../utils/dato';

//TODO: Legge til støtte for flere Locales enn Norsk Bokmål (nb)
const tilTekstligDato = (dato: string) => {
    return format(tilDato(dato), 'd. MMMM yyyy', { locale: nb });
};

export const mapTilRegisterAktiviteterObjektMedLabel = (
    registerAktiviteter: RegisterAktivitet[]
): Record<string, RegisterAktivitetMedLabel> => {
    return registerAktiviteter.reduce(
        (acc, curr) => ({
            ...acc,
            [curr.id]: {
                ...curr,
                label: `${curr.typeNavn}: ${tilTekstligDato(curr.fom)} - ${tilTekstligDato(curr.tom)}`,
            },
        }),
        {} as Record<string, RegisterAktivitetMedLabel>
    );
};

export const skalTaStillingTilAnnenAktivitet = (
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined
) => valgteAktiviteter?.verdier.some((verdi) => verdi.verdi === 'ANNET');
