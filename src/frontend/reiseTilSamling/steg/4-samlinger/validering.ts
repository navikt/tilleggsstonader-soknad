import { Samling } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { erDatoEtterEllerLik } from '../../../utils/datoUtils';
import { harVerdi } from '../../../utils/typeUtils';
import { samlingerTekster } from '../../tekster/samlinger';

export const errorKeyFom = (samlingId: number) => `samling_${samlingId}_fom`;
export const errorKeyTom = (samlingId: number) => `samling_${samlingId}_tom`;
export const errorKeyErObligatorisk = (samlingId: number) => `samling_${samlingId}_erObligatorisk`;
export const errorKeyHarBruktEkstraReiseDager = (samlingId: number) =>
    `samling_${samlingId}_harBruktEkstraReiseDager`;
export const errorKeyBrukSammeAdresse = (samlingId: number) =>
    `samling_${samlingId}_brukSammeAdresseSomForrige`;
export const errorKeyLand = (samlingId: number) => `samling_${samlingId}_land`;
export const errorKeyGateadresse = (samlingId: number) => `samling_${samlingId}_gateadresse`;
export const errorKeyPostnummer = (samlingId: number) => `samling_${samlingId}_postnummer`;
export const errorKeyPoststed = (samlingId: number) => `samling_${samlingId}_poststed`;
export const errorKeyAntallKm = (samlingId: number) => `samling_${samlingId}_antallKm`;

export const nullstillteSamlingsfeil = (samlinger: Samling[]): Valideringsfeil =>
    samlinger.reduce(
        (acc, samling) => ({
            ...acc,
            [errorKeyFom(samling._id)]: undefined,
            [errorKeyTom(samling._id)]: undefined,
            [errorKeyErObligatorisk(samling._id)]: undefined,
            [errorKeyHarBruktEkstraReiseDager(samling._id)]: undefined,
            [errorKeyBrukSammeAdresse(samling._id)]: undefined,
            [errorKeyLand(samling._id)]: undefined,
            [errorKeyGateadresse(samling._id)]: undefined,
            [errorKeyPostnummer(samling._id)]: undefined,
            [errorKeyPoststed(samling._id)]: undefined,
            [errorKeyAntallKm(samling._id)]: undefined,
        }),
        {}
    );

const validerAdresseOgAvstand = (samling: Samling, locale: Locale): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!harVerdi(samling.adresse?.land?.verdi)) {
        feil = {
            ...feil,
            [errorKeyLand(samling._id)]: {
                id: errorKeyLand(samling._id),
                melding: samlingerTekster.feilmelding_land[locale],
            },
        };
    }

    if (!harVerdi(samling.adresse?.gateadresse?.verdi)) {
        feil = {
            ...feil,
            [errorKeyGateadresse(samling._id)]: {
                id: errorKeyGateadresse(samling._id),
                melding: samlingerTekster.feilmelding_gateadresse[locale],
            },
        };
    }

    if (!harVerdi(samling.adresse?.postnummer?.verdi)) {
        feil = {
            ...feil,
            [errorKeyPostnummer(samling._id)]: {
                id: errorKeyPostnummer(samling._id),
                melding: samlingerTekster.feilmelding_postnummer[locale],
            },
        };
    }

    if (!harVerdi(samling.adresse?.poststed?.verdi)) {
        feil = {
            ...feil,
            [errorKeyPoststed(samling._id)]: {
                id: errorKeyPoststed(samling._id),
                melding: samlingerTekster.feilmelding_poststed[locale],
            },
        };
    }

    const km = samling.antallKilometerEnVei?.verdi;
    if (!harVerdi(km)) {
        feil = {
            ...feil,
            [errorKeyAntallKm(samling._id)]: {
                id: errorKeyAntallKm(samling._id),
                melding: samlingerTekster.feilmelding_antall_km[locale],
            },
        };
    } else if (isNaN(Number(km)) || Number(km) <= 0) {
        feil = {
            ...feil,
            [errorKeyAntallKm(samling._id)]: {
                id: errorKeyAntallKm(samling._id),
                melding: samlingerTekster.feilmelding_antall_km_ugyldig[locale],
            },
        };
    }

    return feil;
};

export const validerSamlingUnderRedigering = (
    samling: Samling,
    locale: Locale,
    erFørste: boolean
): Valideringsfeil => {
    const keyFom = errorKeyFom(samling._id);
    const keyTom = errorKeyTom(samling._id);
    const keyErObligatorisk = errorKeyErObligatorisk(samling._id);
    let feil: Valideringsfeil = {};

    if (!harVerdi(samling.fom?.verdi)) {
        feil = {
            ...feil,
            [keyFom]: {
                id: keyFom,
                melding: samlingerTekster.feilmelding_startdato[locale],
            },
        };
    }

    if (!harVerdi(samling.tom?.verdi)) {
        feil = {
            ...feil,
            [keyTom]: {
                id: keyTom,
                melding: samlingerTekster.feilmelding_sluttdato[locale],
            },
        };
    }

    if (harVerdi(samling.fom?.verdi) && harVerdi(samling.tom?.verdi)) {
        if (!erDatoEtterEllerLik(samling.fom!.verdi, samling.tom!.verdi)) {
            feil = {
                ...feil,
                [keyTom]: {
                    id: keyTom,
                    melding: samlingerTekster.feilmelding_sluttdato_før_startdato[locale],
                },
            };
        }
    }

    if (!harVerdi(samling.erObligatorisk?.verdi)) {
        feil = {
            ...feil,
            [keyErObligatorisk]: {
                id: keyErObligatorisk,
                melding: samlingerTekster.feilmelding_radio_samling_obligatorisk[locale],
            },
        };
    }

    if (!harVerdi(samling.harBruktEkstraReiseDager?.verdi)) {
        feil = {
            ...feil,
            [errorKeyHarBruktEkstraReiseDager(samling._id)]: {
                id: errorKeyHarBruktEkstraReiseDager(samling._id),
                melding: samlingerTekster.feilmelding_radio_ekstra_reisedag[locale],
            },
        };
    }

    if (!erFørste && !harVerdi(samling._brukSammeAdresseSomForrige?.verdi)) {
        feil = {
            ...feil,
            [errorKeyBrukSammeAdresse(samling._id)]: {
                id: errorKeyBrukSammeAdresse(samling._id),
                melding: samlingerTekster.feilmelding_brukSammeAdresseSomForrige[locale],
            },
        };
    }

    const gjenbrukerAdresse = !erFørste && samling._brukSammeAdresseSomForrige?.verdi === 'JA';
    if (!gjenbrukerAdresse) {
        feil = { ...feil, ...validerAdresseOgAvstand(samling, locale) };
    }

    return feil;
};

export const validerSamlinger = (samlinger: Samling[], locale: Locale): Valideringsfeil =>
    samlinger.reduce(
        (acc, samling, index) => ({
            ...acc,
            ...validerSamlingUnderRedigering(samling, locale, index === 0),
        }),
        {}
    );
