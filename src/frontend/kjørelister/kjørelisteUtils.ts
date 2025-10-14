import { Reisedag } from './types/Kjøreliste';
import { erHelg } from '../utils/datoUtils';
import { Rammevedtak } from './types/Rammevedtak';

export const harReist = (reisedager: Reisedag[]): boolean =>
    reisedager.some((reisedag) => reisedag.harKjørt);

export const harValgtHelgedag = (reisedager: Reisedag[]) =>
    reisedager.some((reisedag) => erHelg(reisedag.dato.verdi) && reisedag.harKjørt);

export const finnAntallDagerReist = (reisedager: Reisedag[]) =>
    reisedager.filter((reisedag) => reisedag.harKjørt).length;

export const harValgtFlereDagerEnnRammevedtak = (
    rammevedtak: Rammevedtak,
    reisedager: Reisedag[]
) => rammevedtak.reisedagerPerUke < finnAntallDagerReist(reisedager);
