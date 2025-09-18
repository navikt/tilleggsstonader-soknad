import { format, isAfter, isEqual, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';

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

export const tilTekstligDato = (dato: string) => {
    return format(tilDato(dato), 'd. MMMM yyyy', { locale: nb });
};

export const finnDagerMellomFomOgTomInklusiv = (fom: string, tom: string): Date[] => {
    const dager = [];
    for (
        let current = tilDato(fom);
        current <= tilDato(tom);
        current.setDate(current.getDate() + 1)
    ) {
        dager.push(new Date(current));
    }
    return dager;
};

export const tilUkedag = (dato: Date): string => {
    const ukedag = format(dato, 'EEEE', { locale: nb });
    return ukedag.charAt(0).toUpperCase() + ukedag.slice(1);
};

export const erHelg = (dato: string | Date): boolean => {
    const dateObj = tilDato(dato);
    const day = dateObj.getDay();
    return day === 0 || day === 6;
};
