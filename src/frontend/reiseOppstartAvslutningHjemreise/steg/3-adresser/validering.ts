import { AdresseFeilIder, validerAdresse } from '../../../components/AdresseVelger/validering';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { erDatoEtterEllerLik } from '../../../utils/datoUtils';
import { harVerdi } from '../../../utils/typeUtils';
import { adresserTekster } from '../../tekster/adresser';
import { AdresseReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

export const errorKeyMåBoBorteHjemmefra = 'adresser_måBoBorteHjemmefra';
export const errorKeySkalBrukeFolkeregAdresse = 'adresser_skalBrukeFolkeregAdresse';
export const errorKeyFomFlyttedato = 'adresser_fomFlyttedato';
export const errorKeyTomFlyttedato = 'adresser_tomFlyttedato';

export const errorKeyOriginalLand = 'adresser_original_land';
export const errorKeyOriginalGateadresse = 'adresser_original_gateadresse';
export const errorKeyOriginalPostnummer = 'adresser_original_postnummer';
export const errorKeyOriginalPoststed = 'adresser_original_poststed';

export const errorKeyMidlertidigLand = 'adresser_midlertidig_land';
export const errorKeyMidlertidigGateadresse = 'adresser_midlertidig_gateadresse';
export const errorKeyMidlertidigPostnummer = 'adresser_midlertidig_postnummer';
export const errorKeyMidlertidigPoststed = 'adresser_midlertidig_poststed';

export const originalAdresseFeilIder: AdresseFeilIder = {
    land: errorKeyOriginalLand,
    gateadresse: errorKeyOriginalGateadresse,
    postnummer: errorKeyOriginalPostnummer,
    poststed: errorKeyOriginalPoststed,
};

export const midlertidigAdresseFeilIder: AdresseFeilIder = {
    land: errorKeyMidlertidigLand,
    gateadresse: errorKeyMidlertidigGateadresse,
    postnummer: errorKeyMidlertidigPostnummer,
    poststed: errorKeyMidlertidigPoststed,
};

export const validerAdresser = (
    adresser: AdresseReiseOppstartAvslutningHjemreise | undefined,
    locale: Locale,
    harStrukturertAdresse: boolean
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!harVerdi(adresser?.måBoBorteHjemmefra?.verdi)) {
        return {
            ...feil,
            [errorKeyMåBoBorteHjemmefra]: {
                id: errorKeyMåBoBorteHjemmefra,
                melding: adresserTekster.radio_må_bo_borte_hjemmefra.feilmelding[locale],
            },
        };
    }

    if (adresser.måBoBorteHjemmefra?.verdi !== 'JA') {
        return feil;
    }

    if (!harVerdi(adresser.fomFlyttedato?.verdi)) {
        feil = {
            ...feil,
            [errorKeyFomFlyttedato]: {
                id: errorKeyFomFlyttedato,
                melding: adresserTekster.dato_flytting.feilmelding_fom[locale],
            },
        };
    }

    if (!harVerdi(adresser.tomFlyttedato?.verdi)) {
        feil = {
            ...feil,
            [errorKeyTomFlyttedato]: {
                id: errorKeyTomFlyttedato,
                melding: adresserTekster.dato_flytting.feilmelding_tom[locale],
            },
        };
    }

    if (
        harVerdi(adresser.fomFlyttedato?.verdi) &&
        harVerdi(adresser.tomFlyttedato?.verdi) &&
        !erDatoEtterEllerLik(adresser.fomFlyttedato!.verdi, adresser.tomFlyttedato!.verdi)
    ) {
        feil = {
            ...feil,
            [errorKeyTomFlyttedato]: {
                id: errorKeyTomFlyttedato,
                melding: adresserTekster.dato_flytting.feilmelding_tom_før_fom[locale],
            },
        };
    }

    if (!harVerdi(adresser.skalReiseFraFolkeregistrertAdresse?.verdi)) {
        feil = {
            ...feil,
            [errorKeySkalBrukeFolkeregAdresse]: {
                id: errorKeySkalBrukeFolkeregAdresse,
                melding: adresserTekster.radio_samme_som_flyttet_fra.feilmelding[locale],
            },
        };
    }

    const skalBrukeFolkeregAdresse = adresser.skalReiseFraFolkeregistrertAdresse?.verdi === 'JA';
    const måFylleUtOriginalAdresseManuelt = !skalBrukeFolkeregAdresse || !harStrukturertAdresse;

    if (måFylleUtOriginalAdresseManuelt) {
        const feilOriginalAdresse = validerAdresse(
            adresser.adresseOriginaltBosted,
            locale,
            adresserTekster.original_adresse_spørsmål,
            originalAdresseFeilIder
        );
        feil = { ...feil, ...feilOriginalAdresse };
    }

    const feilMidlertidigAdresse = validerAdresse(
        adresser.adresseMidlertidigBosted,
        locale,
        adresserTekster.midlertidig_adresse_spørsmål,
        midlertidigAdresseFeilIder
    );
    feil = { ...feil, ...feilMidlertidigAdresse };

    return feil;
};
