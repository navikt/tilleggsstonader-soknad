import type { Reisemåte } from '../../../typer/søknad';
import type { Locale } from '../../../typer/tekst';
import type { Valideringsfeil } from '../../../typer/validering';
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
                melding: reisemåteTekster.feilmelding_offentlig_mangler[locale]
            }
        };
    }

    if (reisemåte?.kanReiseMedOffentligTransport?.verdi === 'JA') {
        const utgifter = reisemåte?.totalUtgifterOffentligTransport?.verdi;
        if (!harVerdi(utgifter)) {
            feil = {
                ...feil,
                [errorKeyTotalutgifterOffentligTransport]: {
                    id: errorKeyTotalutgifterOffentligTransport,
                    melding: reisemåteTekster.feilmelding_totalutgifter_mangler[locale]
                }
            };
        } else if (!erGyldigKostnad(utgifter)) {
            feil = {
                ...feil,
                [errorKeyTotalutgifterOffentligTransport]: {
                    id: errorKeyTotalutgifterOffentligTransport,
                    melding: reisemåteTekster.feilmelding_totalutgifter_ugyldig[locale]
                }
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
                        reisemåteTekster.feilmelding_kan_ikke_reise_offentlig_begrunnelse[locale]
                }
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
                        melding: reisemåteTekster.feilmelding_barnehage_adresse[locale]
                    }
                };
            }

            if (!harVerdi(reisemåte?.barnehagePostnummer?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyBarnehagePostnummer]: {
                        id: errorKeyBarnehagePostnummer,
                        melding: reisemåteTekster.feilmelding_barnehage_postnummer[locale]
                    }
                };
            }
        }

        if (!harVerdi(reisemåte?.kanBenytteEgenBil?.verdi)) {
            feil = {
                ...feil,
                [errorKeyKanBenytteEgenBil]: {
                    id: errorKeyKanBenytteEgenBil,
                    melding: reisemåteTekster.feilmelding_bil_mangler[locale]
                }
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
                            reisemåteTekster.feilmelding_kan_ikke_benytte_egen_bil_begrunnelse[
                                locale
                            ]
                    }
                };
            }

            if (!harVerdi(reisemåte?.ønskerDekketUtgifterForDrosje?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyØnskerDekketUtgifterForDrosje]: {
                        id: errorKeyØnskerDekketUtgifterForDrosje,
                        melding: reisemåteTekster.feilmelding_utgifter_drosje_mangler[locale]
                    }
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
                            melding: reisemåteTekster.feilmelding_har_tt_kort[locale]
                        }
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
                            reisemåteTekster.feilmelding_egenbil_utgifter_drivstoff_type[locale]
                    }
                };
            }

            const bompenger = reisemåte?.reiseMedBilUtgifter?.bompenger?.verdi;
            if (harVerdi(bompenger) && !erGyldigKostnad(bompenger)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterBompenger]: {
                        id: errorKeyEgenbilUtgifterBompenger,
                        melding: reisemåteTekster.feilmelding_egenbil_utgifter_bompenger[locale]
                    }
                };
            }

            const ferge = reisemåte?.reiseMedBilUtgifter?.ferge?.verdi;
            if (harVerdi(ferge) && !erGyldigKostnad(ferge)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterFerge]: {
                        id: errorKeyEgenbilUtgifterFerge,
                        melding: reisemåteTekster.feilmelding_egenbil_utgifter_ferge[locale]
                    }
                };
            }

            const piggdekkavgift = reisemåte?.reiseMedBilUtgifter?.piggdekkavgift?.verdi;
            if (harVerdi(piggdekkavgift) && !erGyldigKostnad(piggdekkavgift)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterPiggdekkavgift]: {
                        id: errorKeyEgenbilUtgifterPiggdekkavgift,
                        melding:
                            reisemåteTekster.feilmelding_egenbil_utgifter_piggdekkavgift[locale]
                    }
                };
            }
        } else if (reisemåte?.kanBenytteEgenBil?.verdi === 'NEI_SITTER_PÅ_MED_ANDRE') {
            if (!harVerdi(reisemåte?.betalerForReiseSelv?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyBetalerForReiseSelv]: {
                        id: errorKeyBetalerForReiseSelv,
                        melding: reisemåteTekster.feilmelding_betaler_for_reise_selv[locale]
                    }
                };
            }
        }
    }

    return feil;
};
