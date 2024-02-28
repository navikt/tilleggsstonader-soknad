import { Barn } from './barn';

export interface Person {
    fornavn: string;
    visningsnavn: string;
    adresse: string;
    telefonnr: string;
    epost: string;
    kontonr: string;
    barn: Barn[];
}
