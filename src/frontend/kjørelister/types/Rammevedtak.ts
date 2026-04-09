export interface Rammevedtak {
    reiseId: string;
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
    innsendtDato: string | null;
    kanSendeInnKjøreliste: boolean;
}

export const aktivitetTypeTilTekst: Record<string, string> = {
    TILTAK: 'Tiltak',
    UTDANNING: 'Utdanning',
    REELL_ARBEIDSSØKER: 'Reell arbeidssøker',
    INGEN_AKTIVITET: 'Ingen relevant aktivitet',
};

export const formaterAktivitetsnavn = (aktivitetsnavn: string): string =>
    aktivitetTypeTilTekst[aktivitetsnavn] ?? aktivitetsnavn;
