import { Adresse } from '../typer/person';

export const formaterAdresse = (adresse: Adresse) => {
    return `${adresse.adresse}, ${adresse.postnummer} ${adresse.poststed}`;
};

// TODO: Må ta hensyn til dobbeltnavn
export const hentFornavn = (navn: string) => {
    return navn.split(' ')[0];
};
