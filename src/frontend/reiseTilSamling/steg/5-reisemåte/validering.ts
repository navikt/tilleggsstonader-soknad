import { Reisemåte } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { erGyldigKostnad } from '../../../utils/tall';
import { harVerdi } from '../../../utils/typeUtils';
import { reisemåteTekster } from '../../tekster/reisemåte';

export const errorKeyKanReiseMedOffentligTransport = 'reisemåte_kan_reise_med_offentlig_transport';
export const errorKeyKanIkkeReiseMedOffentligTransportBegrunnelse =
    'reisemåte_kan_ikke_reise_med_offentlig_transport_begrunnelse';
export const errorKeyTotalutgifterOffentligTransport =
    'reisemåte_totalutgifter_offentlig_transport';
export const errorKeyKanBenytteEgenBil = 'reisemåte_kan_benytte_egen_bil';
export const errorKeyØnskerDekketUtgifterForDrosje = 'reisemåte_ønsker_dekket_utgifter_for_drosje';
export const errorKeyHarTTKort = 'reisemåte_har_tt_kort';

export const errorKeyKanIkkeBenytteEgenBilBegrunnelse =
    'reisemåte_kan_ikke_benytte_egen_bil_begrunnelse';

export const errorKeyBetalerForReiseSelv = 'reisemåte_betaler_for_reise_selv';

export const errorKeyEgenbilUtgifterDrivstoffType = 'reisemåte_egenbil_utgifter_drivstoff_type';
export const errorKeyEgenbilUtgifterBompenger = 'reisemåte_egenbil_utgifter_bompenger';
export const errorKeyEgenbilUtgifterFerge = 'reisemåte_egenbil_utgifter_ferge';
export const errorKeyEgenbilUtgifterPiggdekkavgift = 'reisemåte_egenbil_utgifter_piggdekkavgift';

export const errorKeyBarnehageAdresse = 'reisemåte_barnehage_adresse';
export const errorKeyBarnehagePostnummer = 'reisemåte_barnehage_postnummer';

export const validerReisemåte = (
    reisemåte: Reisemåte | undefined,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!harVerdi(reisemåte?.kanReiseMedOffentligTransport?.verdi)) {
        return {
            [errorKeyKanReiseMedOffentligTransport]: {
                id: errorKeyKanReiseMedOffentligTransport,
                melding: reisemåteTekster.radio_kan_reise_offentlig.feilmelding[locale],
            },
        };
    }

    if (reisemåte?.kanReiseMedOffentligTransport?.verdi === 'JA') {
        const utgifter = reisemåte?.totalUtgifterOffentligTransport?.verdi;
        if (!harVerdi(utgifter)) {
            feil = {
                ...feil,
                [errorKeyTotalutgifterOffentligTransport]: {
                    id: errorKeyTotalutgifterOffentligTransport,
                    melding: reisemåteTekster.totalutgifter_offentlig_transport.feilmelding[locale],
                },
            };
        } else if (!erGyldigKostnad(utgifter)) {
            feil = {
                ...feil,
                [errorKeyTotalutgifterOffentligTransport]: {
                    id: errorKeyTotalutgifterOffentligTransport,
                    melding:
                        reisemåteTekster.totalutgifter_offentlig_transport.feilmelding_ugyldig[
                            locale
                        ],
                },
            };
        }
    }

    if (reisemåte?.kanReiseMedOffentligTransport?.verdi === 'NEI') {
        if (
            !reisemåte?.kanIkkeReiseMedOffentligTransportBegrunnelser?.verdier.some((felt) =>
                harVerdi(felt.verdi)
            )
        ) {
            feil = {
                ...feil,
                [errorKeyKanIkkeReiseMedOffentligTransportBegrunnelse]: {
                    id: errorKeyKanIkkeReiseMedOffentligTransportBegrunnelse,
                    melding:
                        reisemåteTekster.check_kan_ikke_reise_offentlig_begrunnelse.feilmelding[
                            locale
                        ],
                },
            };
        }

        if (
            reisemåte?.kanIkkeReiseMedOffentligTransportBegrunnelser?.verdier.some(
                (felt) => felt.verdi === 'LEVERING_HENTING_I_BARNEHAGE'
            )
        ) {
            if (!harVerdi(reisemåte?.barnehageGateadresse?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyBarnehageAdresse]: {
                        id: errorKeyBarnehageAdresse,
                        melding: reisemåteTekster.barnehage_adresse.feilmelding[locale],
                    },
                };
            }

            if (!harVerdi(reisemåte?.barnehagePostnummer?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyBarnehagePostnummer]: {
                        id: errorKeyBarnehagePostnummer,
                        melding: reisemåteTekster.barnehage_postnummer.feilmelding[locale],
                    },
                };
            }
        }

        if (!harVerdi(reisemåte?.kanBenytteEgenBil?.verdi)) {
            feil = {
                ...feil,
                [errorKeyKanBenytteEgenBil]: {
                    id: errorKeyKanBenytteEgenBil,
                    melding: reisemåteTekster.radio_kan_benytte_egen_bil.feilmelding[locale],
                },
            };
        } else if (reisemåte?.kanBenytteEgenBil?.verdi === 'NEI') {
            if (
                !reisemåte?.kanIkkeBenytteEgenBilBegrunnelser?.verdier.some((felt) =>
                    harVerdi(felt.verdi)
                )
            ) {
                feil = {
                    ...feil,
                    [errorKeyKanIkkeBenytteEgenBilBegrunnelse]: {
                        id: errorKeyKanIkkeBenytteEgenBilBegrunnelse,
                        melding:
                            reisemåteTekster.check_kan_ikke_benytte_egen_bil_begrunnelse
                                .feilmelding[locale],
                    },
                };
            }

            if (!harVerdi(reisemåte?.ønskerDekketUtgifterForDrosje?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyØnskerDekketUtgifterForDrosje]: {
                        id: errorKeyØnskerDekketUtgifterForDrosje,
                        melding:
                            reisemåteTekster.radio_ønsker_dekket_utgifter_for_drosje.feilmelding[
                                locale
                            ],
                    },
                };
            }

            if (
                reisemåte?.ønskerDekketUtgifterForDrosje?.verdi === 'JA' &&
                reisemåte?.kanIkkeBenytteEgenBilBegrunnelser?.verdier.some(
                    (felt) => felt.verdi === 'HELSEMESSIGE_ÅRSAKER'
                )
            ) {
                if (!harVerdi(reisemåte?.harTTKort?.verdi)) {
                    feil = {
                        ...feil,
                        [errorKeyHarTTKort]: {
                            id: errorKeyHarTTKort,
                            melding: reisemåteTekster.radio_har_du_tt_kort.feilmelding[locale],
                        },
                    };
                }
            }
        } else if (
            reisemåte?.kanBenytteEgenBil?.verdi === 'JA' ||
            (reisemåte?.kanBenytteEgenBil?.verdi === 'NEI_SITTER_PÅ_MED_ANDRE' &&
                reisemåte?.betalerForReiseSelv?.verdi === 'JA')
        ) {
            if (!harVerdi(reisemåte?.reiseMedBilUtgifter?.drivstoffType?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterDrivstoffType]: {
                        id: errorKeyEgenbilUtgifterDrivstoffType,
                        melding:
                            reisemåteTekster.egen_bil_utgifter_drivstoff_type.feilmelding[locale],
                    },
                };
            }

            const bompenger = reisemåte?.reiseMedBilUtgifter?.bompenger?.verdi;
            if (harVerdi(bompenger) && !erGyldigKostnad(bompenger)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterBompenger]: {
                        id: errorKeyEgenbilUtgifterBompenger,
                        melding: reisemåteTekster.egen_bil_utgifter_bompenger.feilmelding[locale],
                    },
                };
            }

            const ferge = reisemåte?.reiseMedBilUtgifter?.ferge?.verdi;
            if (harVerdi(ferge) && !erGyldigKostnad(ferge)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterFerge]: {
                        id: errorKeyEgenbilUtgifterFerge,
                        melding: reisemåteTekster.egen_bil_utgifter_ferge.feilmelding[locale],
                    },
                };
            }

            const piggdekkavgift = reisemåte?.reiseMedBilUtgifter?.piggdekkavgift?.verdi;
            if (harVerdi(piggdekkavgift) && !erGyldigKostnad(piggdekkavgift)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterPiggdekkavgift]: {
                        id: errorKeyEgenbilUtgifterPiggdekkavgift,
                        melding:
                            reisemåteTekster.egen_bil_utgifter_piggdekkavgift.feilmelding[locale],
                    },
                };
            }
        } else if (reisemåte?.kanBenytteEgenBil?.verdi === 'NEI_SITTER_PÅ_MED_ANDRE') {
            if (!harVerdi(reisemåte?.betalerForReiseSelv?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyBetalerForReiseSelv]: {
                        id: errorKeyBetalerForReiseSelv,
                        melding: reisemåteTekster.radio_betaler_for_reise_selv.feilmelding[locale],
                    },
                };
            }
        }
    }

    return feil;
};
