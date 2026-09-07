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

export const validerAvreiseadresse = (
    avreiseadresse: Avreiseadresse,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!harVerdi(avreiseadresse.skalReiseFraFolkeregistrertAdresse?.verdi)) {
        feil = {
            ...feil,
            [errorKeySkalReiseFraFolkeregAdr]: {
                id: errorKeySkalReiseFraFolkeregAdr,
                melding: avreiseadresseTekster.radio_skalReiseFraFolkeregAdr.feilmelding[locale],
            },
        };
    } else if (avreiseadresse.skalReiseFraFolkeregistrertAdresse?.verdi === 'NEI') {
        if (!harVerdi(avreiseadresse.adresseDetSkalReisesFra?.land?.verdi)) {
            feil = {
                ...feil,
                [errorKeyAvreiseLand]: {
                    id: errorKeyAvreiseLand,
                    melding: avreiseadresseTekster.velg_land.feilmelding[locale],
                },
            };
        }
        if (!harVerdi(avreiseadresse.adresseDetSkalReisesFra?.gateadresse?.verdi)) {
            feil = {
                ...feil,
                [errorKeyAvreiseGateadresse]: {
                    id: errorKeyAvreiseGateadresse,
                    melding: avreiseadresseTekster.avreiseadresse_vegadresse.feilmelding[locale],
                },
            };
        }
        if (!harVerdi(avreiseadresse.adresseDetSkalReisesFra?.postnummer?.verdi)) {
            feil = {
                ...feil,
                [errorKeyAvreisePostnummer]: {
                    id: errorKeyAvreisePostnummer,
                    melding: avreiseadresseTekster.avreiseadresse_postnummer.feilmelding[locale],
                },
            };
        }
        if (!harVerdi(avreiseadresse.adresseDetSkalReisesFra?.poststed?.verdi)) {
            feil = {
                ...feil,
                [errorKeyAvreisePoststed]: {
                    id: errorKeyAvreisePoststed,
                    melding: avreiseadresseTekster.avreiseadresse_poststed.feilmelding[locale],
                },
            };
        }
    }

    return feil;
};
