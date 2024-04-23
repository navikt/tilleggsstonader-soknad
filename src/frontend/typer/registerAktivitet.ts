export interface RegisterAktivitet {
    id: string;
    fom: string;
    tom: string;
    erUtdanning: boolean;
    typeNavn: string;
}

export interface RegisterAktivitetMedLabel extends RegisterAktivitet {
    label: string;
}

export interface RegisterAktiviteterResponse {
    aktiviteter: RegisterAktivitet[];
    suksess: boolean;
}
