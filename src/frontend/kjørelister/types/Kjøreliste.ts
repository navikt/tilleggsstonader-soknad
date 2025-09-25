export interface Kjøreliste {
    reisedager: { [dato: string]: Reisedag };
}

export interface Reisedag {
    harReist: boolean;
    parkeringsutgift: number | undefined;
}

export interface KjørelisteKvittering {
    mottattTidspunkt: string;
    saksnummer: number;
}
