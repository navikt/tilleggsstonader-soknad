import { Reisedag, UkeMedReisedager } from './types/Kjøreliste';
import { erHelg } from '../utils/datoUtils';

export const harReist = (reisedager: Reisedag[]): boolean =>
    reisedager.some((reisedag) => reisedag.harKjørt);

export const harValgtHelgedag = (reisedager: Reisedag[]) =>
    reisedager.some((reisedag) => erHelg(reisedag.dato.verdi) && reisedag.harKjørt);

export const harValgtHelligdag = (reisedager: Reisedag[]) =>
    reisedager.some((reisedag) => reisedag.erHelligdag && reisedag.harKjørt);

export const hentValgteHelligdagnavn = (reisedager: Reisedag[]): string[] =>
    reisedager
        .filter((reisedag) => reisedag.erHelligdag && reisedag.harKjørt && reisedag.helligdagnavn)
        .map((reisedag) => reisedag.helligdagnavn!);

export const finnAntallDagerReist = (reisedager: Reisedag[]) =>
    reisedager.filter((reisedag) => reisedag.harKjørt).length;

export const harValgtFlereDagerEnnRammevedtak = (ukeMedReisedager: UkeMedReisedager) =>
    ukeMedReisedager.antallReisedagerIUke < finnAntallDagerReist(ukeMedReisedager.reisedager);
