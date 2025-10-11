import { DokumentasjonFelt, VerdiFelt } from '../../typer/skjema';
import { SøknadMetadata } from '../../typer/søknad';

export interface Kjøreliste {
    reisedagerPerUkeAvsnitt: UkeMedReisedager[];
    dokumentasjon: DokumentasjonFelt[];
    søknadMetadata: SøknadMetadata;
}

export interface UkeMedReisedager {
    ukeLabel: string;
    spørsmål: string;
    reisedager: Reisedag[];
}

export interface Reisedag {
    dato: VerdiFelt<Date>;
    harKjørt: boolean;
    parkeringsutgift: VerdiFelt<number>;
}
export interface KjørelisteKvittering {
    mottattTidspunkt: string;
    saksnummer: number;
}
