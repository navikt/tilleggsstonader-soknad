import { erHelg } from '../utils/datoUtils';
import type { Reisedag, UkeMedReisedager } from './types/Kjøreliste';

export const harReist = (reisedager: Reisedag[]): boolean =>
    reisedager.some((reisedag) => reisedag.harKjørt);

export const harValgtHelgedag = (reisedager: Reisedag[]) =>
    reisedager.some((reisedag) => erHelg(reisedag.dato.verdi) && reisedag.harKjørt);

export const harValgtHelligdag = (reisedager: Reisedag[]) =>
    reisedager.some((reisedag) => reisedag.erHelligdag && reisedag.harKjørt);

export const hentValgteHelligdagnavn = (reisedager: Reisedag[]): string[] =>
    reisedager
        .filter((reisedag) => reisedag.erHelligdag && reisedag.harKjørt && reisedag.helligdagnavn)
        .map((reisedag) => reisedag.helligdagnavn ?? null)
        .filter((navn): navn is string => navn !== null);

export const finnAntallDagerReist = (reisedager: Reisedag[]) =>
    reisedager.filter((reisedag) => reisedag.harKjørt).length;

export const harValgtFlereDagerEnnRammevedtak = (ukeMedReisedager: UkeMedReisedager) =>
    ukeMedReisedager.antallReisedagerIUke < finnAntallDagerReist(ukeMedReisedager.reisedager);
