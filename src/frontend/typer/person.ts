import { Barn } from './barn';

export interface Person {
    fornavn: string;
    visningsnavn: string;
    adresse: string;
    barn: Barn[];
}
