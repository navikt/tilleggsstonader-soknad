import { Reisedag, UkeMedReisedager } from './types/Kjøreliste';
import { erHelg } from '../utils/datoUtils';

export const harReist = (reisedager: Reisedag[]): boolean =>
    reisedager.some((reisedag) => reisedag.harKjørt);

export const harValgtHelgedag = (reisedager: Reisedag[]) =>
    reisedager.some((reisedag) => erHelg(reisedag.dato.verdi) && reisedag.harKjørt);

export const finnAntallDagerReist = (reisedager: Reisedag[]) =>
    reisedager.filter((reisedag) => reisedag.harKjørt).length;

export const harValgtFlereDagerEnnRammevedtak = (ukeMedReisedager: UkeMedReisedager) =>
    ukeMedReisedager.antallReisedagerIUke < finnAntallDagerReist(ukeMedReisedager.reisedager);
