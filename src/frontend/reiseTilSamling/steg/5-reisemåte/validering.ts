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
export const errorKeyKanBenytteDrosje = 'reisemåte_kan_benytte_drosje';
export const errorKeyKanIkkeBenytteEgenBilBegrunnelse =
    'reisemåte_kan_ikke_benytte_egen_bil_begrunnelse';

export const errorKeyEgenbilUtgifterDrivstoffType = 'reisemåte_egenbil_utgifter_drivstoff_type';
export const errorKeyEgenbilUtgifterBompenger = 'reisemåte_egenbil_utgifter_bompenger';
export const errorKeyEgenbilUtgifterFerge = 'reisemåte_egenbil_utgifter_ferge';
export const errorKeyEgenbilUtgifterPiggdekkavgift = 'reisemåte_egenbil_utgifter_piggdekkavgift';

export const validerReisemåte = (
    reisemåte: Reisemåte | undefined,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!harVerdi(reisemåte?.kanReiseMedOffentligTransport?.verdi)) {
        return {
            [errorKeyKanReiseMedOffentligTransport]: {
                id: errorKeyKanReiseMedOffentligTransport,
                melding: reisemåteTekster.feilmelding_offentlig_mangler[locale],
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
                    melding: reisemåteTekster.feilmelding_totalutgifter_mangler[locale],
                },
            };
        } else if (!erGyldigKostnad(utgifter)) {
            feil = {
                ...feil,
                [errorKeyTotalutgifterOffentligTransport]: {
                    id: errorKeyTotalutgifterOffentligTransport,
                    melding: reisemåteTekster.feilmelding_totalutgifter_ugyldig[locale],
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
                        reisemåteTekster.feilmelding_kan_ikke_reise_offentlig_begrunnelse[locale],
                },
            };
        }
        if (!harVerdi(reisemåte?.kanBenytteEgenBil?.verdi)) {
            feil = {
                ...feil,
                [errorKeyKanBenytteEgenBil]: {
                    id: errorKeyKanBenytteEgenBil,
                    melding: reisemåteTekster.feilmelding_bil_mangler[locale],
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
                            reisemåteTekster.feilmelding_kan_ikke_benytte_egen_bil_begrunnelse[
                                locale
                            ],
                    },
                };
            }

            if (!harVerdi(reisemåte?.kanBenytteDrosje?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyKanBenytteDrosje]: {
                        id: errorKeyKanBenytteDrosje,
                        melding: reisemåteTekster.feilmelding_drosje_mangler[locale],
                    },
                };
            }
        } else if (reisemåte?.kanBenytteEgenBil?.verdi === 'JA') {
            if (!harVerdi(reisemåte?.egenBilUtgifter?.drivstoffType?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterDrivstoffType]: {
                        id: errorKeyEgenbilUtgifterDrivstoffType,
                        melding:
                            reisemåteTekster.feilmelding_egenbil_utgifter_drivstoff_type[locale],
                    },
                };
            }

            if (!erGyldigKostnad(reisemåte?.egenBilUtgifter?.bompenger?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterBompenger]: {
                        id: errorKeyEgenbilUtgifterBompenger,
                        melding: reisemåteTekster.feilmelding_egenbil_utgifter_bompenger[locale],
                    },
                };
            }

            if (!erGyldigKostnad(reisemåte?.egenBilUtgifter?.ferge?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterFerge]: {
                        id: errorKeyEgenbilUtgifterFerge,
                        melding: reisemåteTekster.feilmelding_egenbil_utgifter_ferge[locale],
                    },
                };
            }

            if (!erGyldigKostnad(reisemåte?.egenBilUtgifter?.piggdekkavgift?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterPiggdekkavgift]: {
                        id: errorKeyEgenbilUtgifterPiggdekkavgift,
                        melding:
                            reisemåteTekster.feilmelding_egenbil_utgifter_piggdekkavgift[locale],
                    },
                };
            }
        }
    }

    return feil;
};
