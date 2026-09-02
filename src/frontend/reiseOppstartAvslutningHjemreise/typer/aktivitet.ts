import { EnumFelt } from '../../typer/skjema';
import { AktivitetFelles, JaNei } from '../../typer/søknad';

export interface AktivitetReiseOppstartAvslutningHjemreise extends AktivitetFelles {
    måBoBorteHjemmefra: EnumFelt<JaNei> | undefined;
}
