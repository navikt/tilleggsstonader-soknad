import { isEqual } from 'date-fns';

import { Kjøreliste, Reisedag } from './types/Kjøreliste';

export const harRegistertDataForUke = (dagerIUka: Date[], kjøreliste: Kjøreliste): boolean =>
    dagerIUka.some((dag) => finnReisedag(kjøreliste, dag)?.harKjørt ?? false);

export const finnReisedag = (kjøreliste: Kjøreliste, dato: Date): Reisedag | undefined =>
    kjøreliste.reisedagerPerUkeAvsnitt
        .flatMap((uke) => uke.reisedager)
        .find((reisedag) => isEqual(reisedag.dato.verdi, dato));
