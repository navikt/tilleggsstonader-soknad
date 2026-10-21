import { PrivatBilInfo, UtgifterPrivatBil } from '../../../typer/reisemåte';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { erGyldigKostnad } from '../../../utils/tall';
import { harVerdi } from '../../../utils/typeUtils';
import { PrivatBilTekster } from '../tekster';

export const errorKeyPrivatBilBenyttetEgenBil = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_privatbil_benyttet_egen_bil`;
export const errorKeyPrivatBilBetalteForReiseSelv = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_privatbil_betalte_for_reise_selv`;
export const errorKeyPrivatBilStrekningHvorBilBleBenyttet = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_privatbil_strekning_hvor_bil_ble_benyttet`;
export const errorKeyPrivatBilAntallKilometerKjørt = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_privatbil_antall_kilometer_kjort`;

export const maksLengdeStrekningHvorBilBleBenyttet = 100;

export const errorKeyPrivatBilUtgifterDrivstoffType = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_privatbil_utgifter_drivstoff_type`;
export const errorKeyPrivatBilUtgifterBompenger = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_privatbil_utgifter_bompenger`;
export const errorKeyPrivatBilUtgifterFerge = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_privatbil_utgifter_ferge`;
export const errorKeyPrivatBilUtgifterPiggdekkavgift = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_privatbil_utgifter_piggdekkavgift`;
export const errorKeyPrivatBilUtgifterParkering = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_privatbil_utgifter_parkering`;

export const nullstilteUtgifterPrivatBilFeil = (reiseId: number): Valideringsfeil => ({
    [errorKeyPrivatBilUtgifterDrivstoffType(reiseId)]: undefined,
    [errorKeyPrivatBilUtgifterBompenger(reiseId)]: undefined,
    [errorKeyPrivatBilUtgifterFerge(reiseId)]: undefined,
    [errorKeyPrivatBilUtgifterPiggdekkavgift(reiseId)]: undefined,
    [errorKeyPrivatBilUtgifterParkering(reiseId)]: undefined,
});

export const nullstilteInfoBilKunDelerAvStrekningFeil = (reiseId: number): Valideringsfeil => ({
    [errorKeyPrivatBilStrekningHvorBilBleBenyttet(reiseId)]: undefined,
    [errorKeyPrivatBilAntallKilometerKjørt(reiseId)]: undefined,
});

export const nullstiltePrivatBilFeil = (reiseId: number): Valideringsfeil => ({
    [errorKeyPrivatBilBenyttetEgenBil(reiseId)]: undefined,
    [errorKeyPrivatBilBetalteForReiseSelv(reiseId)]: undefined,
    ...nullstilteInfoBilKunDelerAvStrekningFeil(reiseId),
    ...nullstilteUtgifterPrivatBilFeil(reiseId),
});

export const validerPrivatBil = (
    privatBil: PrivatBilInfo | undefined,
    locale: Locale,
    reiseId: number,
    skalReiseMedFlereTransportmidler: boolean,
    tekster: PrivatBilTekster
): Valideringsfeil => {
    if (!harVerdi(privatBil?.benyttetEgenBil?.verdi)) {
        return {
            [errorKeyPrivatBilBenyttetEgenBil(reiseId)]: {
                id: errorKeyPrivatBilBenyttetEgenBil(reiseId),
                melding: tekster.radio_kan_benytte_egen_bil.feilmelding[locale],
            },
        };
    }

    if (
        privatBil?.benyttetEgenBil?.verdi === 'NEI' &&
        !harVerdi(privatBil?.betalteForReisen?.verdi)
    ) {
        return {
            [errorKeyPrivatBilBetalteForReiseSelv(reiseId)]: {
                id: errorKeyPrivatBilBetalteForReiseSelv(reiseId),
                melding: tekster.radio_betaler_for_reise_selv.feilmelding[locale],
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
                reiseId,
                skalReiseMedFlereTransportmidler,
                tekster
            ),
            ...validerUtgifterPrivatBil(privatBil?.utgifterPrivatBil, locale, reiseId, tekster),
        };
    }

    return {};
};

const validerInfoBilKunDelerAvStrekning = (
    infoBilKunDelerAvStrekning: PrivatBilInfo['infoBilKunDelerAvStrekning'],
    locale: Locale,
    reiseId: number,
    skalReiseMedFlereTransportmidler: boolean,
    tekster: PrivatBilTekster
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
            [errorKeyPrivatBilStrekningHvorBilBleBenyttet(reiseId)]: {
                id: errorKeyPrivatBilStrekningHvorBilBleBenyttet(reiseId),
                melding: tekster.privat_bil_strekning_kjørt.feilmelding[locale],
            },
        };
    } else if (strekningHvorBilBleBenyttetVerdi.length > maksLengdeStrekningHvorBilBleBenyttet) {
        feil = {
            ...feil,
            [errorKeyPrivatBilStrekningHvorBilBleBenyttet(reiseId)]: {
                id: errorKeyPrivatBilStrekningHvorBilBleBenyttet(reiseId),
                melding: tekster.privat_bil_strekning_kjørt.feilmelding_for_lang[locale],
            },
        };
    }

    if (!harVerdi(infoBilKunDelerAvStrekning?.antallKilometerKjørt?.verdi)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilAntallKilometerKjørt(reiseId)]: {
                id: errorKeyPrivatBilAntallKilometerKjørt(reiseId),
                melding: tekster.privat_bil_km_kjørt.feilmelding[locale],
            },
        };
    }

    return feil;
};

const validerUtgifterPrivatBil = (
    utgifterPrivatBil: UtgifterPrivatBil | undefined,
    locale: Locale,
    reiseId: number,
    tekster: PrivatBilTekster
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    const bompenger = utgifterPrivatBil?.bompenger?.verdi;
    const bompengerHarVerdi = harVerdi(bompenger);

    if (bompengerHarVerdi && !erGyldigKostnad(bompenger)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterBompenger(reiseId)]: {
                id: errorKeyPrivatBilUtgifterBompenger(reiseId),
                melding: tekster.privat_bil_utgifter_bompenger.feilmelding[locale],
            },
        };
    }

    const ferge = utgifterPrivatBil?.ferge?.verdi;
    const fergeHarVerdi = harVerdi(ferge);
    if (fergeHarVerdi && !erGyldigKostnad(ferge)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterFerge(reiseId)]: {
                id: errorKeyPrivatBilUtgifterFerge(reiseId),
                melding: tekster.privat_bil_utgifter_ferge.feilmelding[locale],
            },
        };
    }

    const piggdekkavgift = utgifterPrivatBil?.piggdekkavgift?.verdi;
    if (harVerdi(piggdekkavgift) && !erGyldigKostnad(piggdekkavgift)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterPiggdekkavgift(reiseId)]: {
                id: errorKeyPrivatBilUtgifterPiggdekkavgift(reiseId),
                melding: tekster.privat_bil_utgifter_piggdekkavgift.feilmelding[locale],
            },
        };
    }

    const parkering = utgifterPrivatBil?.parkering?.verdi;
    if (harVerdi(parkering) && !erGyldigKostnad(parkering)) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterParkering(reiseId)]: {
                id: errorKeyPrivatBilUtgifterParkering(reiseId),
                melding: tekster.privat_bil_utgifter_parkering.feilmelding[locale],
            },
        };
    }

    if (
        (bompengerHarVerdi || fergeHarVerdi) &&
        !harVerdi(utgifterPrivatBil?.drivstoffType?.verdi)
    ) {
        feil = {
            ...feil,
            [errorKeyPrivatBilUtgifterDrivstoffType(reiseId)]: {
                id: errorKeyPrivatBilUtgifterDrivstoffType(reiseId),
                melding: tekster.privat_bil_utgifter_drivstoff_type.feilmelding[locale],
            },
        };
    }

    return feil;
};
