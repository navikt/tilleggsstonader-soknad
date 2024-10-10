import { Barn } from './barn';

export interface Person {
    fornavn: string;
    alder: number;
    visningsnavn: string;
    adresse: string;
    barn: Barn[];
}
