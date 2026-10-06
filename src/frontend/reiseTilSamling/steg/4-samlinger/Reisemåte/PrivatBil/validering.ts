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
export const errorKeyPrivatBilStrekningHvorBilBleBenyttet = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_privatbil_strekning_hvor_bil_ble_benyttet`;
export const errorKeyPrivatBilAntallKilometerKjørt = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_privatbil_antall_kilometer_kjort`;

export const maksLengdeStrekningHvorBilBleBenyttet = 100;

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

export const nullstilteInfoBilKunDelerAvStrekningFeil = (samlingId: number): Valideringsfeil => ({
    [errorKeyPrivatBilStrekningHvorBilBleBenyttet(samlingId)]: undefined,
    [errorKeyPrivatBilAntallKilometerKjørt(samlingId)]: undefined,
});

export const nullstiltePrivatBilFeil = (samlingId: number): Valideringsfeil => ({
    [errorKeyPrivatBilBenyttetEgenBil(samlingId)]: undefined,
    [errorKeyPrivatBilBetalteForReiseSelv(samlingId)]: undefined,
    ...nullstilteInfoBilKunDelerAvStrekningFeil(samlingId),
    ...nullstilteUtgifterPrivatBilFeil(samlingId),
});

export const validerPrivatBil = (
    privatBil: PrivatBilInfo | undefined,
    locale: Locale,
    samlingId: number,
    skalReiseMedFlereTransportmidler: boolean
): Valideringsfeil => {
    if (!harVerdi(privatBil?.benyttetEgenBil?.verdi)) {
        return {
            [errorKeyPrivatBilBenyttetEgenBil(samlingId)]: {
                id: errorKeyPrivatBilBenyttetEgenBil(samlingId),
                melding: reisemåteTekster.radio_kan_benytte_egen_bil.feilmelding[locale],
            },
        };
    }

    if (
        privatBil?.benyttetEgenBil?.verdi === 'NEI' &&
        !harVerdi(privatBil?.betalteForReisen?.verdi)
    ) {
        return {
            [errorKeyPrivatBilBetalteForReiseSelv(samlingId)]: {
                id: errorKeyPrivatBilBetalteForReiseSelv(samlingId),
                melding: reisemåteTekster.radio_betaler_for_reise_selv.feilmelding[locale],
            },
        };
    }

    if (
        privatBil?.benyttetEgenBil?.verdi === 'JA' ||
        (privatBil?.benyttetEgenBil?.verdi === 'NEI' && privatBil?.betalteForReisen?.verdi === 'JA')
    ) {
        return {
            ...validerInfoBilKunDelerAvStrekning(
                privatBil?.infoBilKunDelerAvStrekning,
                locale,
                samlingId,
                skalReiseMedFlereTransportmidler
            ),
            ...validerUtgifterPrivatBil(privatBil?.utgifterPrivatBil, locale, samlingId),
        };
    }

    return {};
};

const validerInfoBilKunDelerAvStrekning = (
    infoBilKunDelerAvStrekning: PrivatBilInfo['infoBilKunDelerAvStrekning'],
    locale: Locale,
    samlingId: number,
    skalReiseMedFlereTransportmidler: boolean
): Valideringsfeil => {
    if (!skalReiseMedFlereTransportmidler) {
        return {};
    }

    let feil: Valideringsfeil = {};

    const strekningHvorBilBleBenyttetVerdi =
        infoBilKunDelerAvStrekning?.strekningHvorBilBleBenyttet?.verdi;

    if (!harVerdi(strekningHvorBilBleBenyttetVerdi)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilStrekningHvorBilBleBenyttet(samlingId)]: {
                id: errorKeyPrivatBilStrekningHvorBilBleBenyttet(samlingId),
                melding: reisemåteTekster.privat_bil_strekning_kjørt.feilmelding[locale],
            },
        };
    } else if (strekningHvorBilBleBenyttetVerdi.length > maksLengdeStrekningHvorBilBleBenyttet) {
        feil = {
            ...feil,
            [errorKeyPrivatBilStrekningHvorBilBleBenyttet(samlingId)]: {
                id: errorKeyPrivatBilStrekningHvorBilBleBenyttet(samlingId),
                melding: reisemåteTekster.privat_bil_strekning_kjørt.feilmelding_for_lang[locale],
            },
        };
    }

    if (!harVerdi(infoBilKunDelerAvStrekning?.antallKilometerKjørt?.verdi)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilAntallKilometerKjørt(samlingId)]: {
                id: errorKeyPrivatBilAntallKilometerKjørt(samlingId),
                melding: reisemåteTekster.privat_bil_km_kjørt.feilmelding[locale],
            },
        };
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
