import { Reisemåte } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
import { reisemåteTekster } from '../../tekster/reisemåte';

export const errorKeyKanReiseKollektivt = 'reisemåte_kan_reise_kollektivt';
export const errorKeyKanIkkeReiseKollektivtBegrunnelse =
    'reisemåte_kan_ikke_reise_kollektivt_begrunnelse';
export const errorKeyTotalutgifterKollektivt = 'reisemåte_totalutgifter_kollektivt';
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
            [errorKeyKanReiseKollektivt]: {
                id: errorKeyKanReiseKollektivt,
                melding: reisemåteTekster.feilmelding_offentlig_mangler[locale],
            },
        };
    }

    if (reisemåte?.kanReiseMedOffentligTransport?.verdi === 'JA') {
        const utgifter = reisemåte?.totalUtgifterOffentligTransport?.verdi;
        if (!harVerdi(utgifter)) {
            feil = {
                ...feil,
                [errorKeyTotalutgifterKollektivt]: {
                    id: errorKeyTotalutgifterKollektivt,
                    melding: reisemåteTekster.feilmelding_totalutgifter_mangler[locale],
                },
            };
        } else if (isNaN(Number(utgifter)) || Number(utgifter) <= 0) {
            feil = {
                ...feil,
                [errorKeyTotalutgifterKollektivt]: {
                    id: errorKeyTotalutgifterKollektivt,
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
                [errorKeyKanIkkeReiseKollektivtBegrunnelse]: {
                    id: errorKeyKanIkkeReiseKollektivtBegrunnelse,
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

            const bompenger = reisemåte?.egenBilUtgifter?.bompenger?.verdi;

            if (bompenger && (isNaN(Number(bompenger)) || Number(bompenger) <= 0)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterBompenger]: {
                        id: errorKeyEgenbilUtgifterBompenger,
                        melding: reisemåteTekster.feilmelding_egenbil_utgifter_bompenger[locale],
                    },
                };
            }

            const ferge = reisemåte?.egenBilUtgifter?.ferge?.verdi;

            if (ferge && (isNaN(Number(ferge)) || Number(ferge) <= 0)) {
                feil = {
                    ...feil,
                    [errorKeyEgenbilUtgifterFerge]: {
                        id: errorKeyEgenbilUtgifterFerge,
                        melding: reisemåteTekster.feilmelding_egenbil_utgifter_ferge[locale],
                    },
                };
            }

            const piggdekkavgift = reisemåte?.egenBilUtgifter?.piggdekkavgift?.verdi;

            if (piggdekkavgift && (isNaN(Number(piggdekkavgift)) || Number(piggdekkavgift) <= 0)) {
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
