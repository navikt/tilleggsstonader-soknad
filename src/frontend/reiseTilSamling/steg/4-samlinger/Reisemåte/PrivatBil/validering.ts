import { Locale } from '../../../../../typer/tekst';
import { Valideringsfeil } from '../../../../../typer/validering';
import { erGyldigKostnad } from '../../../../../utils/tall';
import { harVerdi } from '../../../../../utils/typeUtils';
import { reisemåteTekster } from '../../../../tekster/reisemåte';
import { PrivatBilInfo, UtgifterPrivatBil } from '../../../../typer/reisemåte';

export const errorKeyPrivatBilBenyttetEgenBil = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_privatbil_benyttet_egen_bil`;
export const errorKeyPrivatBilBetalteForReiseSelv = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_privatbil_betalte_for_reise_selv`;

export const errorKeyPrivatBilUtgifterDrivstoffType = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_privatbil_utgifter_drivstoff_type`;
export const errorKeyPrivatBilUtgifterBompenger = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_privatbil_utgifter_bompenger`;
export const errorKeyPrivatBilUtgifterFerge = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_privatbil_utgifter_ferge`;
export const errorKeyPrivatBilUtgifterPiggdekkavgift = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_privatbil_utgifter_piggdekkavgift`;
export const errorKeyPrivatBilUtgifterParkering = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_privatbil_utgifter_parkering`;

export const nullstilteUtgifterPrivatBilFeil = (samlingId: number): Valideringsfeil => ({
    [errorKeyPrivatBilUtgifterDrivstoffType(samlingId)]: undefined,
    [errorKeyPrivatBilUtgifterBompenger(samlingId)]: undefined,
    [errorKeyPrivatBilUtgifterFerge(samlingId)]: undefined,
    [errorKeyPrivatBilUtgifterPiggdekkavgift(samlingId)]: undefined,
    [errorKeyPrivatBilUtgifterParkering(samlingId)]: undefined,
});

export const nullstiltePrivatBilFeil = (samlingId: number): Valideringsfeil => ({
    [errorKeyPrivatBilBenyttetEgenBil(samlingId)]: undefined,
    [errorKeyPrivatBilBetalteForReiseSelv(samlingId)]: undefined,
    ...nullstilteUtgifterPrivatBilFeil(samlingId),
});

export const validerPrivatBil = (
    privatBil: PrivatBilInfo | undefined,
    locale: Locale,
    samlingId: number
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!harVerdi(privatBil?.benyttetEgenBil?.verdi)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilBenyttetEgenBil(samlingId)]: {
                id: errorKeyPrivatBilBenyttetEgenBil(samlingId),
                melding: reisemåteTekster.radio_kan_benytte_egen_bil.feilmelding[locale],
            },
        };
    } else {
        if (privatBil?.benyttetEgenBil?.verdi === 'JA') {
            feil = {
                ...feil,
                ...validerUtgifterPrivatBil(privatBil?.utgifterPrivatBil, locale, samlingId),
            };
        }
        if (privatBil?.benyttetEgenBil?.verdi === 'NEI') {
            if (!harVerdi(privatBil?.betalteForReisen?.verdi)) {
                feil = {
                    ...feil,
                    [errorKeyPrivatBilBetalteForReiseSelv(samlingId)]: {
                        id: errorKeyPrivatBilBetalteForReiseSelv(samlingId),
                        melding: reisemåteTekster.radio_betaler_for_reise_selv.feilmelding[locale],
                    },
                };
            } else if (privatBil?.betalteForReisen?.verdi === 'JA') {
                feil = {
                    ...feil,
                    ...validerUtgifterPrivatBil(privatBil?.utgifterPrivatBil, locale, samlingId),
                };
            }
        }

        return feil;
    }

    return feil;
};

const validerUtgifterPrivatBil = (
    utgifterPrivatBil: UtgifterPrivatBil | undefined,
    locale: Locale,
    samlingId: number
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    const bompenger = utgifterPrivatBil?.bompenger?.verdi;
    const bompengerHarVerdi = harVerdi(bompenger);

    if (bompengerHarVerdi && !erGyldigKostnad(bompenger)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterBompenger(samlingId)]: {
                id: errorKeyPrivatBilUtgifterBompenger(samlingId),
                melding: reisemåteTekster.privat_bil_utgifter_bompenger.feilmelding[locale],
            },
        };
    }

    const ferge = utgifterPrivatBil?.ferge?.verdi;
    const fergeHarVerdi = harVerdi(ferge);
    if (fergeHarVerdi && !erGyldigKostnad(ferge)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterFerge(samlingId)]: {
                id: errorKeyPrivatBilUtgifterFerge(samlingId),
                melding: reisemåteTekster.privat_bil_utgifter_ferge.feilmelding[locale],
            },
        };
    }

    const piggdekkavgift = utgifterPrivatBil?.piggdekkavgift?.verdi;
    if (harVerdi(piggdekkavgift) && !erGyldigKostnad(piggdekkavgift)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterPiggdekkavgift(samlingId)]: {
                id: errorKeyPrivatBilUtgifterPiggdekkavgift(samlingId),
                melding: reisemåteTekster.privat_bil_utgifter_piggdekkavgift.feilmelding[locale],
            },
        };
    }

    const parkering = utgifterPrivatBil?.parkering?.verdi;
    if (harVerdi(parkering) && !erGyldigKostnad(parkering)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterParkering(samlingId)]: {
                id: errorKeyPrivatBilUtgifterParkering(samlingId),
                melding: reisemåteTekster.privat_bil_utgifter_parkering.feilmelding[locale],
            },
        };
    }

    if (
        (bompengerHarVerdi || fergeHarVerdi) &&
        !harVerdi(utgifterPrivatBil?.drivstoffType?.verdi)
    ) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterDrivstoffType(samlingId)]: {
                id: errorKeyPrivatBilUtgifterDrivstoffType(samlingId),
                melding: reisemåteTekster.privat_bil_utgifter_drivstoff_type.feilmelding[locale],
            },
        };
    }

    return feil;
};
