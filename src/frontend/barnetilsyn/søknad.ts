import { Barnepass } from '../typer/barn';
import { DokumentasjonFelt, Dokumentasjonsbehov } from '../typer/skjema';
import { Aktivitet, Hovedytelse } from '../typer/søknad';

export interface MellomlagretSøknadTilsynBarn {
    steg: string;
    hovedytelse?: Hovedytelse;
    aktivitet?: Aktivitet;
    valgteBarn: string[];
    barnepass: Barnepass[];
    dokumentasjonsbehov: Dokumentasjonsbehov[];
    dokumentasjon: DokumentasjonFelt[];
}
