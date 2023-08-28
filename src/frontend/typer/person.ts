export interface Person {
    fnr: string;
    navn: string;
    adresse: IAdresse;
    telefonnr: string;
    epost: string;
    kontonr: string;
}

export interface IAdresse {
    adresse: string;
    postnummer: string;
    poststed?: string;
}
