import { Barn } from './barn';

export interface Person {
    navn: string;
    adresse: Adresse;
    telefonnr: string;
    epost: string;
    kontonr: string;
    barn: Barn[];
}

export interface Adresse {
    adresse: string;
    postnummer: string;
    poststed: string;
}
