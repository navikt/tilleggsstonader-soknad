import { Reisemåte } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
import { reisemåteTekster } from '../../tekster/reisemåte';

export const errorKeyKanReiseKollektivt = 'reisemåte_kan_reise_kollektivt';
export const errorKeyTotalutgifterKollektivt = 'reisemåte_totalutgifter_kollektivt';
export const errorKeyKanBenytteEgenBil = 'reisemåte_kan_benytte_egen_bil';
export const errorKeyKanBenytteDrosje = 'reisemåte_kan_benytte_drosje';

export const validerReisemåte = (
    reisemåte: Reisemåte | undefined,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!harVerdi(reisemåte?.kanReiseKollektivt?.verdi)) {
        return {
            [errorKeyKanReiseKollektivt]: {
                id: errorKeyKanReiseKollektivt,
                melding: reisemåteTekster.feilmelding_kollektivt_mangler[locale],
            },
        };
    }

    if (reisemåte?.kanReiseKollektivt?.verdi === 'JA') {
        const utgifter = reisemåte?.totalutgifterKollektivt?.verdi;
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

    if (reisemåte?.kanReiseKollektivt?.verdi === 'NEI') {
        if (!harVerdi(reisemåte?.kanBenytteEgenBil?.verdi)) {
            feil = {
                ...feil,
                [errorKeyKanBenytteEgenBil]: {
                    id: errorKeyKanBenytteEgenBil,
                    melding: reisemåteTekster.feilmelding_bil_mangler[locale],
                },
            };
        } else if (reisemåte?.kanBenytteEgenBil?.verdi === 'NEI') {
            if (!harVerdi(reisemåte?.kanBenytteDrosje?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyKanBenytteDrosje]: {
                        id: errorKeyKanBenytteDrosje,
                        melding: reisemåteTekster.feilmelding_drosje_mangler[locale],
                    },
                };
            }
        }
    }

    return feil;
};
