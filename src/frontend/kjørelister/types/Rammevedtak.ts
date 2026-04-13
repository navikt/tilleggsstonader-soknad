export interface Rammevedtak {
    reiseId: string;
    fom: string;
    tom: string;
    aktivitetsadresse: string;
    aktivitetsnavn: string;
    uker: RammevedtakUke[];
}

export interface RammevedtakUke {
    ukeNummer: number;
    fom: string;
    tom: string;
    reisedagerPerUke: number;
    innsendtDato: string | null;
    kanSendeInnKjøreliste: boolean;
}
