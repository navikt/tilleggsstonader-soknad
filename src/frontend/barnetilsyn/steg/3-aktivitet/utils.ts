import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

import {
    ArbeidsrettetAktivitetMedLabel,
    RegisterAktivitet,
} from '../../../typer/registerAktivitet';
import { tilDato } from '../../../utils/dato';

//TODO: Legge til støtte for flere Locales enn Norsk Bokmål (nb)
const tilTekstligDato = (dato: string) => {
    return format(tilDato(dato), 'd. MMMM yyyy', { locale: nb });
};

export const mapTIlArbeidsrettedeAktiviteterObjektMedLabel = (
    registerAktiviteter: RegisterAktivitet[]
): Record<string, ArbeidsrettetAktivitetMedLabel> => {
    return registerAktiviteter.reduce(
        (acc, curr) => ({
            ...acc,
            [curr.id]: {
                ...curr,
                label: `${curr.typeNavn}: ${tilTekstligDato(curr.fom)} - ${tilTekstligDato(curr.tom)}`,
            },
        }),
        {} as Record<string, ArbeidsrettetAktivitetMedLabel>
    );
};
