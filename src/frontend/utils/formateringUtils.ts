import { format, formatISO, parseISO } from 'date-fns';

export const datoFormat = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
} as const;

export const formaterIsoDato = (dato: string): string => {
    return parseISO(dato).toLocaleDateString('no-NO', datoFormat);
};
export const formaterPeriode = (fom?: string, tom?: string): string => {
    if (!fom || !tom) return '';
    return `${formaterIsoDato(fom)} - ${formaterIsoDato(tom)}`;
};
export const formaterNullableIsoDato = (dato: string | undefined): string | undefined =>
    dato && formaterIsoDato(dato);

export const formaterIsoDatoTid = (dato: string): string => {
    return format(parseISO(dato), "dd.MM.yyyy 'kl'.HH:mm");
};

export const formaterNullableIsoDatoTid = (dato?: string): string | undefined => {
    return dato && formaterIsoDatoTid(dato);
};

export const tilLocaleDateString = (dato: Date) => formatISO(dato, { representation: 'date' });

export const nullableTilDato = (dato: string | Date | undefined): Date | undefined => {
    if (typeof dato === 'string') {
        return dato !== '' ? parseISO(dato) : undefined;
    } else {
        return dato;
    }
};
