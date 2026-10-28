import { AdresseFeilIder, validerAdresse } from '../../../components/AdresseVelger/validering';
import { Avreiseadresse } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
import { avreiseadresseTekster } from '../../tekster/avreiseadresse';

export const errorKeySkalReiseFraFolkeregAdr = 'avreiseadresse_skalReiseFraFolkeregAdr';
export const errorKeyAvreiseLand = 'avreiseadresse_avreise_land';
export const errorKeyAvreiseGateadresse = 'avreiseadresse_avreise_gateadresse';
export const errorKeyAvreisePostnummer = 'avreiseadresse_avreise_postnummer';
export const errorKeyAvreisePoststed = 'avreiseadresse_avreise_poststed';

export const avreiseadresseFeilIder: AdresseFeilIder = {
    land: errorKeyAvreiseLand,
    gateadresse: errorKeyAvreiseGateadresse,
    postnummer: errorKeyAvreisePostnummer,
    poststed: errorKeyAvreisePoststed,
};

export const validerAvreiseadresse = (
    avreiseadresse: Avreiseadresse,
    locale: Locale,
    manglerFolkeregistrertAdresse: boolean
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (
        !manglerFolkeregistrertAdresse &&
        !harVerdi(avreiseadresse.skalReiseFraFolkeregistrertAdresse?.verdi)
    ) {
        feil = {
            ...feil,
            [errorKeySkalReiseFraFolkeregAdr]: {
                id: errorKeySkalReiseFraFolkeregAdr,
                melding: avreiseadresseTekster.bruk_folkeregistrert_adresse.feilmelding[locale],
            },
        };
    }

    const skalRegistereAdresseManuelt =
        manglerFolkeregistrertAdresse ||
        avreiseadresse.skalReiseFraFolkeregistrertAdresse?.verdi === 'NEI';

    if (skalRegistereAdresseManuelt) {
        const feilAdresse = validerAdresse(
            avreiseadresse.adresseDetSkalReisesFra,
            locale,
            avreiseadresseTekster.manuell_adresse,
            avreiseadresseFeilIder
        );
        feil = { ...feil, ...feilAdresse };
    }

    return feil;
};
