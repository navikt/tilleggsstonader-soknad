import { parseISO } from 'date-fns';

import { Adresse } from '../typer/person';

export const datoFormat = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
} as const;

export const formaterAdresse = (adresse: Adresse) => {
    return `${adresse.adresse}, ${adresse.postnummer} ${adresse.poststed}`;
};

// TODO: Må ta hensyn til dobbeltnavn
export const hentFornavn = (navn: string) => {
    return navn.split(' ')[0];
};

export const formaterIsoDato = (dato: string): string => {
    return parseISO(dato).toLocaleDateString('no-NO', datoFormat);
};

export const formaterDatoTid = (dato?: Date): string | undefined => {
    return (
        dato &&
        dato.toLocaleDateString('no-NO', datoFormat) +
            ', klokken ' +
            dato.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })
    );
};
