import { Locale } from '../../../../typer/tekst';
import { Valideringsfeil } from '../../../../typer/validering';
import { erGyldigKostnad } from '../../../../utils/tall';
import { harVerdi } from '../../../../utils/typeUtils';
import { reisemåteTekster } from '../../../tekster/reisemåte';
import { PrivatBilInfo, UtgifterPrivatBil } from '../../../typer/reisemåte';

export const errorKeyPrivatBilBenyttetEgenBil = 'reisemåte_privatbil_benyttet_egen_bil';
export const errorKeyPrivatBilBetalteForReiseSelv = 'reisemåte_privatbil_betalte_for_reise_selv';

export const errorKeyPrivatBilUtgifterDrivstoffType = 'reisemåte_privatbil_utgifter_drivstoff_type';
export const errorKeyPrivatBilUtgifterBompenger = 'reisemåte_privatbil_utgifter_bompenger';
export const errorKeyPrivatBilUtgifterFerge = 'reisemåte_privatbil_utgifter_ferge';
export const errorKeyPrivatBilUtgifterPiggdekkavgift =
    'reisemåte_privatbil_utgifter_piggdekkavgift';

export const nullstiltePrivatBilFeil: Valideringsfeil = {
    [errorKeyPrivatBilBenyttetEgenBil]: undefined,
    [errorKeyPrivatBilBetalteForReiseSelv]: undefined,
    [errorKeyPrivatBilUtgifterDrivstoffType]: undefined,
    [errorKeyPrivatBilUtgifterBompenger]: undefined,
    [errorKeyPrivatBilUtgifterFerge]: undefined,
    [errorKeyPrivatBilUtgifterPiggdekkavgift]: undefined,
};

export const nullstilteUtgifterPrivatBilFeil: Valideringsfeil = {
    [errorKeyPrivatBilUtgifterDrivstoffType]: undefined,
    [errorKeyPrivatBilUtgifterBompenger]: undefined,
    [errorKeyPrivatBilUtgifterFerge]: undefined,
    [errorKeyPrivatBilUtgifterPiggdekkavgift]: undefined,
};

export const validerPrivatBil = (
    privatBil: PrivatBilInfo | undefined,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!harVerdi(privatBil?.benyttetEgenBil?.verdi)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilBenyttetEgenBil]: {
                id: errorKeyPrivatBilBenyttetEgenBil,
                melding: reisemåteTekster.radio_kan_benytte_egen_bil.feilmelding[locale],
            },
        };
    } else {
        if (privatBil?.benyttetEgenBil?.verdi === 'JA') {
            feil = {
                ...feil,
                ...validerUtgifterPrivatBilGruppe(privatBil?.utgifterPrivatBil, locale),
            };
        }
        if (privatBil?.benyttetEgenBil?.verdi === 'NEI_SITTER_PÅ_MED_ANDRE') {
            if (!harVerdi(privatBil?.betalteForReisen?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyPrivatBilBetalteForReiseSelv]: {
                        id: errorKeyPrivatBilBetalteForReiseSelv,
                        melding: reisemåteTekster.radio_betaler_for_reise_selv.feilmelding[locale],
                    },
                };
            } else if (privatBil?.betalteForReisen?.verdi === 'JA') {
                feil = {
                    ...feil,
                    ...validerUtgifterPrivatBilGruppe(privatBil?.utgifterPrivatBil, locale),
                };
            }
        }

        return feil;
    }

    return feil;
};

const validerUtgifterPrivatBilGruppe = (
    utgifterPrivatBil: UtgifterPrivatBil | undefined,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    const bompenger = utgifterPrivatBil?.bompenger?.verdi;
    const bompengerHarVerdi = harVerdi(bompenger);
    if (bompengerHarVerdi && !erGyldigKostnad(bompenger)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterBompenger]: {
                id: errorKeyPrivatBilUtgifterBompenger,
                melding: reisemåteTekster.egen_bil_utgifter_bompenger.feilmelding[locale],
            },
        };
    }

    const ferge = utgifterPrivatBil?.ferge?.verdi;
    const fergeHarVerdi = harVerdi(ferge);
    if (fergeHarVerdi && !erGyldigKostnad(ferge)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterFerge]: {
                id: errorKeyPrivatBilUtgifterFerge,
                melding: reisemåteTekster.egen_bil_utgifter_ferge.feilmelding[locale],
            },
        };
    }

    const piggdekkavgift = utgifterPrivatBil?.piggdekkavgift?.verdi;
    if (harVerdi(piggdekkavgift) && !erGyldigKostnad(piggdekkavgift)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterPiggdekkavgift]: {
                id: errorKeyPrivatBilUtgifterPiggdekkavgift,
                melding: reisemåteTekster.egen_bil_utgifter_piggdekkavgift.feilmelding[locale],
            },
        };
    }

    if (
        (bompengerHarVerdi || fergeHarVerdi) &&
        !harVerdi(utgifterPrivatBil?.drivstoffType?.verdi)
    ) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterDrivstoffType]: {
                id: errorKeyPrivatBilUtgifterDrivstoffType,
                melding: reisemåteTekster.egen_bil_utgifter_drivstoff_type.feilmelding[locale],
            },
        };
    }

    return feil;
};
