import { isAfter, isEqual, parseISO } from 'date-fns';

export const erSnartNyttSkoleår = () => {
    const nåværendeMåned = new Date().getMonth() + 1;

    return nåværendeMåned >= 6 && nåværendeMåned <= 8;
};

export const tilDato = (dato: string | Date): Date =>
    typeof dato === 'string' ? parseISO(dato) : dato;

export const erDatoEtterEllerLik = (fra: string, til: string): boolean => {
    const datoFra = tilDato(fra);
    const datoTil = tilDato(til);

    return isEqual(datoFra, datoTil) || isAfter(datoTil, datoFra);
};
