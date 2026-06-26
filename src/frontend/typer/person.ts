import { Barn } from './barn';

export interface Adresse {
    land: string;
    adressenavn: string;
    postnummer: string;
    poststed: string;
}

export interface Person {
    fornavn: string;
    alder: number;
    visningsnavn: string;
    adresse: string;
    strukturertAdresse?: Adresse;
    barn: Barn[];
}
