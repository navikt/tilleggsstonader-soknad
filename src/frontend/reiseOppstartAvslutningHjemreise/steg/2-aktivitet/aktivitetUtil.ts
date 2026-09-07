import { AnnenAktivitetType } from '../../../typer/aktivitet';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';

export const skalTaStillingTilBorMidlertidigBorte = (
    annenAktivitet: EnumFelt<AnnenAktivitetType> | undefined,
    valgteAktiviteter: EnumFlereValgFelt<string> | undefined
) => {
    if (valgteAktiviteter != undefined && valgteAktiviteter.verdier.length > 0) {
        return true;
    }

    if (
        annenAktivitet != undefined &&
        (annenAktivitet.verdi === AnnenAktivitetType.TILTAK ||
            annenAktivitet.verdi === AnnenAktivitetType.UTDANNING)
    ) {
        return true;
    }

    return false;
};

export const skalTaStillingTilBarnUnder18SomHarFlyttetMed = (
    måBoBorteHjemmefra: EnumFelt<JaNei> | undefined
) => måBoBorteHjemmefra?.verdi === 'JA';
