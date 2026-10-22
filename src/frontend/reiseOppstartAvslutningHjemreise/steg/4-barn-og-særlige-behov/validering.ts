import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
import { barnOgSærligeBehovTekster } from '../../tekster/barnOgSærligeBehov';
import { BarnOgSærligeBehovReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

export const errorKeyHarBarnUnder18SomHarFlyttetMed =
    'barnOgSærligeBehov_harBarnUnder18SomHarFlyttetMed';
export const errorKeyHvilkeBarnFlytterMed = 'barnOgSærligeBehov_hvilkeBarnFlytterMed';
export const errorKeyHarBarnHjemmeUnder4Klasse = 'barnOgSærligeBehov_harBarnHjemmeUnder4Klasse';
export const errorKeyHarSærligeBehovForFlereHjemreiser =
    'barnOgSærligeBehov_harSærligeBehovForFlereHjemreiser';

export const validerBarnOgSærligeBehov = (
    barnOgSærligeBehov: BarnOgSærligeBehovReiseOppstartAvslutningHjemreise | undefined,
    locale: Locale,
    harBarn: boolean
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (harBarn && !harVerdi(barnOgSærligeBehov?.harBarnUnder18SomHarFlyttetMed?.verdi)) {
        feil = {
            ...feil,
            [errorKeyHarBarnUnder18SomHarFlyttetMed]: {
                id: errorKeyHarBarnUnder18SomHarFlyttetMed,
                melding:
                    barnOgSærligeBehovTekster.radio_har_barn_under_18_som_har_flyttet_med
                        .feilmelding[locale],
            },
        };
    }

    if (
        barnOgSærligeBehov?.harBarnUnder18SomHarFlyttetMed?.verdi === 'JA' &&
        !barnOgSærligeBehov?.hvilkeBarnFlytterMed?.verdier.length
    ) {
        feil = {
            ...feil,
            [errorKeyHvilkeBarnFlytterMed]: {
                id: errorKeyHvilkeBarnFlytterMed,
                melding: barnOgSærligeBehovTekster.hvilke_barn_flytter_med.feilmelding[locale],
            },
        };
    }

    if (harBarn && !harVerdi(barnOgSærligeBehov?.harBarnHjemmeUnder4Klasse?.verdi)) {
        feil = {
            ...feil,
            [errorKeyHarBarnHjemmeUnder4Klasse]: {
                id: errorKeyHarBarnHjemmeUnder4Klasse,
                melding:
                    barnOgSærligeBehovTekster.radio_har_barn_hjemme_under_4_klasse.feilmelding[
                        locale
                    ],
            },
        };
    }

    if (!harVerdi(barnOgSærligeBehov?.harSærligeBehovForFlereHjemreiser?.verdi)) {
        feil = {
            ...feil,
            [errorKeyHarSærligeBehovForFlereHjemreiser]: {
                id: errorKeyHarSærligeBehovForFlereHjemreiser,
                melding:
                    barnOgSærligeBehovTekster.radio_har_særlige_behov_for_flere_hjemreiser
                        .feilmelding[locale],
            },
        };
    }

    return feil;
};
