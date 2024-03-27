import { Barnepass } from '../typer/barn';
import { DokumentasjonFelt, Dokumentasjonsbehov } from '../typer/skjema';
import { Aktivitet, Hovedytelse } from '../typer/søknad';

export interface SøknadTilsynBarn {
    steg: string;
    hovedytelse?: Hovedytelse;
    aktivitet?: Aktivitet;
    barnepass: Barnepass[];
    dokumentasjonsbehov: Dokumentasjonsbehov[];
    dokumentasjon: DokumentasjonFelt[];
}
