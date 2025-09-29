export interface Rammevedtak {
    id: string;
    fom: string;
    tom: string;
    reisedagerPerUke: number;
    aktivitetsadresse: string;
    aktivitetsnavn: string;
    uker: RammevedtakUke[];
}

export interface RammevedtakUke {
    ukeNummer: number;
    fom: string;
    tom: string;
}
