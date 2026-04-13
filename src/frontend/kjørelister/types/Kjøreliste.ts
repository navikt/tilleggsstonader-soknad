import { DokumentasjonFelt, VerdiFelt } from '../../typer/skjema';
import { SøknadMetadata } from '../../typer/søknad';

export interface Kjøreliste {
    reiseId: string;
    reisedagerPerUkeAvsnitt: UkeMedReisedager[];
    dokumentasjon: DokumentasjonFelt[];
    søknadMetadata: SøknadMetadata;
}

export interface UkeMedReisedager {
    ukeLabel: string;
    reisedagerLabel: string;
    antallReisedagerIUke: number;
    spørsmål: string;
    reisedager: Reisedag[];
    sendtInnTidligere: boolean;
}

export interface Reisedag {
    dato: VerdiFelt<string>;
    harKjørt: boolean;
    parkeringsutgift: VerdiFelt<number | null>;
}
export interface KjørelisteKvittering {
    mottattTidspunkt: string;
    saksnummer: number;
}
