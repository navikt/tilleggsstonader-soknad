import { Reiseavstand } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
import { reiseavstandTekster } from '../../tekster/reiseavstand';

export const errorKeySkalReiseFraFolkeregAdr = 'reiseavstand_skalReiseFraFolkeregAdr';
export const errorKeyAvreiseLand = 'reiseavstand_avreise_land';
export const errorKeyAvreiseGateadresse = 'reiseavstand_avreise_gateadresse';
export const errorKeyAvreisePostnummer = 'reiseavstand_avreise_postnummer';
export const errorKeyAvreisePoststed = 'reiseavstand_avreise_poststed';
export const errorKeyAntallKm = 'reiseavstand_antall_km';
export const errorKeyLand = 'reiseavstand_land';
export const errorKeyGateadresse = 'reiseavstand_gateadresse';
export const errorKeyPostnummer = 'reiseavstand_postnummer';
export const errorKeyPoststed = 'reiseavstand_poststed';

export const validerReiseavstand = (
    reiseavstand: Reiseavstand,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!harVerdi(reiseavstand.skalReiseFraFolkeregAdr?.verdi)) {
        feil = {
            ...feil,
            [errorKeySkalReiseFraFolkeregAdr]: {
                id: errorKeySkalReiseFraFolkeregAdr,
                melding: reiseavstandTekster.feilmelding_skalReiseFraFolkeregAdr[locale],
            },
        };
    } else if (reiseavstand.skalReiseFraFolkeregAdr?.verdi === 'NEI') {
        if (!harVerdi(reiseavstand.adresseDuSkalReiseFra?.land?.verdi)) {
            feil = {
                ...feil,
                [errorKeyAvreiseLand]: {
                    id: errorKeyAvreiseLand,
                    melding: reiseavstandTekster.feilmelding_avreise_land[locale],
                },
            };
        }
        if (!harVerdi(reiseavstand.adresseDuSkalReiseFra?.gateadresse?.verdi)) {
            feil = {
                ...feil,
                [errorKeyAvreiseGateadresse]: {
                    id: errorKeyAvreiseGateadresse,
                    melding: reiseavstandTekster.feilmelding_avreise_gateadresse[locale],
                },
            };
        }
        if (!harVerdi(reiseavstand.adresseDuSkalReiseFra?.postnummer?.verdi)) {
            feil = {
                ...feil,
                [errorKeyAvreisePostnummer]: {
                    id: errorKeyAvreisePostnummer,
                    melding: reiseavstandTekster.feilmelding_avreise_postnummer[locale],
                },
            };
        }
        if (!harVerdi(reiseavstand.adresseDuSkalReiseFra?.poststed?.verdi)) {
            feil = {
                ...feil,
                [errorKeyAvreisePoststed]: {
                    id: errorKeyAvreisePoststed,
                    melding: reiseavstandTekster.feilmelding_avreise_poststed[locale],
                },
            };
        }
    }

    const km = reiseavstand.antallKilometerEnVei?.verdi;
    if (!harVerdi(km)) {
        feil = {
            ...feil,
            [errorKeyAntallKm]: {
                id: errorKeyAntallKm,
                melding: reiseavstandTekster.feilmelding_antall_km[locale],
            },
        };
    } else if (isNaN(Number(km)) || Number(km) <= 0) {
        feil = {
            ...feil,
            [errorKeyAntallKm]: {
                id: errorKeyAntallKm,
                melding: reiseavstandTekster.feilmelding_antall_km_ugyldig[locale],
            },
        };
    }

    if (!harVerdi(reiseavstand.aktivitetsadresse.land?.verdi)) {
        feil = {
            ...feil,
            [errorKeyLand]: {
                id: errorKeyLand,
                melding: reiseavstandTekster.feilmelding_land[locale],
            },
        };
    }

    if (!harVerdi(reiseavstand.aktivitetsadresse.gateadresse?.verdi)) {
        feil = {
            ...feil,
            [errorKeyGateadresse]: {
                id: errorKeyGateadresse,
                melding: reiseavstandTekster.feilmelding_gateadresse[locale],
            },
        };
    }

    if (!harVerdi(reiseavstand.aktivitetsadresse.postnummer?.verdi)) {
        feil = {
            ...feil,
            [errorKeyPostnummer]: {
                id: errorKeyPostnummer,
                melding: reiseavstandTekster.feilmelding_postnummer[locale],
            },
        };
    }

    if (!harVerdi(reiseavstand.aktivitetsadresse.poststed?.verdi)) {
        feil = {
            ...feil,
            [errorKeyPoststed]: {
                id: errorKeyPoststed,
                melding: reiseavstandTekster.feilmelding_poststed[locale],
            },
        };
    }

    return feil;
};
