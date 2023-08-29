import { Adresse } from '../typer/person';

export const formatterAdresse = (adresse: Adresse) => {
    return `${adresse.adresse}, ${adresse.postnummer} ${adresse.poststed}`;
};
