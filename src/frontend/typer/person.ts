import { Barn } from './barn';

export interface Person {
    navn: string;
    adresse: string;
    telefonnr: string;
    epost: string;
    kontonr: string;
    barn: Barn[];
}
