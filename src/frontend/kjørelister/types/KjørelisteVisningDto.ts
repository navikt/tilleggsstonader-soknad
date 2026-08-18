export interface KjørelisteVisningDto {
    reisedager: ReisedagVisningDto[];
}

export interface ReisedagVisningDto {
    dato: string;
    harKjørt: boolean;
    parkeringsutgift: number | null;
}
