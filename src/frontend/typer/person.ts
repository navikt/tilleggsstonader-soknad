export interface Person {
    fnr: string;
    navn: string;
    adresse: Adresse;
    telefonnr: string;
    epost: string;
    kontonr: string;
}

export interface Adresse {
    adresse: string;
    postnummer: string;
    poststed?: string;
}
