import { Dokumentasjonsbehov, EnumFelt, VedleggstypeLæremidler } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';

export const finnDokumentasjonsbehov = (
    harFunksjonsnedsettelse: EnumFelt<JaNei> | undefined
): Dokumentasjonsbehov[] => {
    if (harFunksjonsnedsettelse && harFunksjonsnedsettelse.verdi === 'JA') {
        return [
            { type: VedleggstypeLæremidler.DOKUMENTASJON_FUNKSJONSNEDSETTELSE },
            { type: VedleggstypeLæremidler.UTGIFTER_FUNKSJONSNEDSETTELSE },
        ];
    }
    return [];
};
