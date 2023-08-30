export interface Tiltak {
    type: 'utdanning' | 'arbeidsrettet_tiltak';
    navn: string;
    periode: {
        fom: string;
        tom: string;
    };
}
