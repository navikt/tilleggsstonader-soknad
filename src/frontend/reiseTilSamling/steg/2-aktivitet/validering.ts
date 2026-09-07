import {
    skalViseAktivitetTypeUtdanningValg,
    skalViseArbeidsrettedeAktiviteter,
    skalViseErLærlingEllerLiknende,
    skalViseErUnder25År,
    skalViseFårDekketReise,
    skalViseLønnetTiltak,
    skalViseMåBetaleForReiseTilSkole,
} from './synlighet';
import { erLærlingEllerLiknendeTekster } from '../../../components/Aktivitet/ErLærlingEllerLiknende';
import { RegisterAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
import { aktivitetTekster } from '../../tekster/aktivitet';
import { AktivitetReiseTilSamling } from '../../typer/aktivitet';
export const errorKeyValgteAktiviteter = 'aktivitet_valgteAktiviteter';
export const errorKeyAnnenAktivitet = 'aktivitet_annenAktivitet';
export const errorKeyAnnenAktivitetTypeUtdanning = 'aktivitet_annenAktivitetTypeUtdanning';
export const errorKeyErLærlingEllerLiknende = 'aktivitet_erLærlingEllerLiknende';
export const errorKeyFårDekketReise = 'aktivitet_fårDekketReise';
export const errorKeyErUnder25År = 'aktivitet_erUnder25År';
export const errorKeyMåBetaleForReiseTilSkole = 'aktivitet_måBetaleForReiseTilSkole';
export const errorKeyLønnetAktivitet = 'aktivitet_lønnetAktivitet';

export const validerAktivitetReiseTilSamling = (
    aktivitetReiseTilSamling: AktivitetReiseTilSamling,
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    const valgteAktiviteter = aktivitetReiseTilSamling.aktiviteter;
    const annenAktivitet = aktivitetReiseTilSamling.annenAktivitet;
    const lønnetAktivitet = aktivitetReiseTilSamling.lønnetAktivitet;
    const annenAktivitetTypeUtdanning = aktivitetReiseTilSamling.annenAktivitetTypeUtdanning;
    const tilleggsopplysninger = aktivitetReiseTilSamling.tilleggsopplysningerAnnenAktivitet;
    const erLærlingEllerLiknende = tilleggsopplysninger?.erLærlingEllerLiknende;
    const erUnder25År = tilleggsopplysninger?.erUnder25År;

    if (skalViseArbeidsrettedeAktiviteter(registerAktiviteter)) {
        if (!valgteAktiviteter || valgteAktiviteter.verdier.length === 0) {
            feil = {
                ...feil,
                [errorKeyValgteAktiviteter]: {
                    id: errorKeyValgteAktiviteter,
                    melding: aktivitetTekster.checkbox_velge_aktivitet_feilmelding[locale],
                },
            };
        }
    } else if (!harVerdi(annenAktivitet?.verdi)) {
        feil = {
            ...feil,
            [errorKeyAnnenAktivitet]: {
                id: errorKeyAnnenAktivitet,
                melding: aktivitetTekster.radio_annet_uten_registeraktivitet.feilmelding[locale],
            },
        };
    }

    if (skalViseAktivitetTypeUtdanningValg(annenAktivitet, valgteAktiviteter)) {
        if (!harVerdi(annenAktivitetTypeUtdanning?.verdi)) {
            feil = {
                ...feil,
                [errorKeyAnnenAktivitetTypeUtdanning]: {
                    id: errorKeyAnnenAktivitetTypeUtdanning,
                    melding:
                        aktivitetTekster.radio_type_arbeidsrettede_aktiviteter.feilmelding[locale],
                },
            };
        } else if (skalViseErLærlingEllerLiknende(annenAktivitetTypeUtdanning)) {
            if (!harVerdi(erLærlingEllerLiknende?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyErLærlingEllerLiknende]: {
                        id: errorKeyErLærlingEllerLiknende,
                        melding:
                            erLærlingEllerLiknendeTekster.radio_lærling_etc.feilmelding[locale],
                    },
                };
            } else if (skalViseFårDekketReise(erLærlingEllerLiknende)) {
                if (!harVerdi(tilleggsopplysninger?.fårDekketReise?.verdi)) {
                    feil = {
                        ...feil,
                        [errorKeyFårDekketReise]: {
                            id: errorKeyFårDekketReise,
                            melding: aktivitetTekster.radio_dekket_reise.feilmelding[locale],
                        },
                    };
                }
            } else if (skalViseErUnder25År(erLærlingEllerLiknende)) {
                if (!harVerdi(erUnder25År?.verdi)) {
                    feil = {
                        ...feil,
                        [errorKeyErUnder25År]: {
                            id: errorKeyErUnder25År,
                            melding: aktivitetTekster.radio_under_25_år.feilmelding[locale],
                        },
                    };
                } else if (skalViseMåBetaleForReiseTilSkole(erUnder25År)) {
                    if (!harVerdi(tilleggsopplysninger?.måBetaleForReiseTilSkole?.verdi)) {
                        feil = {
                            ...feil,
                            [errorKeyMåBetaleForReiseTilSkole]: {
                                id: errorKeyMåBetaleForReiseTilSkole,
                                melding:
                                    aktivitetTekster.radio_må_betale_for_reise_til_skole
                                        .feilmelding[locale],
                            },
                        };
                    }
                }
            }
        }
    }

    if (skalViseLønnetTiltak(annenAktivitetTypeUtdanning)) {
        if (!harVerdi(lønnetAktivitet?.verdi)) {
            feil = {
                ...feil,
                [errorKeyLønnetAktivitet]: {
                    id: errorKeyLønnetAktivitet,
                    melding: aktivitetTekster.radio_lønnet_tiltak.feilmelding[locale],
                },
            };
        }
    }

    return feil;
};
