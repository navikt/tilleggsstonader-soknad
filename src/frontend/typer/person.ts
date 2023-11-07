import { Barn } from './barn';

export interface Person {
    ident: string;
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
