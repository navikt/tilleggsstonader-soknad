export interface Kjøreliste {
    reisedager: { [dato: string]: Reisedag };
}

export interface Reisedag {
    skalReise: boolean;
    parkeringsutgift: number | undefined;
}
