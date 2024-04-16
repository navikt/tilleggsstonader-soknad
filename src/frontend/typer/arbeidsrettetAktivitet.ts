export interface ArbeidsrettetAktivitet {
    id: string;
    fom: string;
    tom: string;
    erUtdanning: boolean;
    typeNavn: string;
}

export interface ArbeidsrettetAktivitetMedLabel extends ArbeidsrettetAktivitet {
    label: string;
}

export interface ArbeidsrettedeAktiviterFraBackend {
    aktiviteter: ArbeidsrettetAktivitet[];
    suksess: boolean;
}
