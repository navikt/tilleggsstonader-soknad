import { Kjøreliste } from './types/Kjøreliste';

export const harRegistertDataForUke = (dagerIUka: Date[], kjøreliste: Kjøreliste): boolean =>
    dagerIUka.some((dag) => kjøreliste.reisedager[dag.toISOString()].harReist);
