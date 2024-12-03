export interface RegisterAktivitet {
    id: string;
    fom: string;
    tom: string | null;
    erUtdanning: boolean;
    erUtdanningPåVgsNivå: boolean;
    typeNavn: string;
}

export interface RegisterAktivitetMedLabel extends RegisterAktivitet {
    label: string;
}

export interface RegisterAktiviteterResponse {
    aktiviteter: RegisterAktivitet[];
    suksess: boolean;
}
