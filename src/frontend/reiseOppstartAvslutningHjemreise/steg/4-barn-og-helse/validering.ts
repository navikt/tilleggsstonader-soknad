import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
import { barnOgHelseTekster } from '../../tekster/barnOgHelse';
import { BarnOgHelseReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

export const errorKeyHarBarnUnder18SomHarFlyttetMed = 'barnOgHelse_harBarnUnder18SomHarFlyttetMed';
export const errorKeyHvilkeBarnFlytterMed = 'barnOgHelse_hvilkeBarnFlytterMed';
export const errorKeyHarBarnHjemmeUnder4Klasse = 'barnOgHelse_harBarnHjemmeUnder4Klasse';
export const errorKeyHarSærligeBehovForFlereHjemreiser =
    'barnOgHelse_harSærligeBehovForFlereHjemreiser';

export const validerBarnOgHelse = (
    barnOgHelse: BarnOgHelseReiseOppstartAvslutningHjemreise | undefined,
    locale: Locale,
    harBarn: boolean
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (harBarn && !harVerdi(barnOgHelse?.harBarnUnder18SomHarFlyttetMed?.verdi)) {
        feil = {
            ...feil,
            [errorKeyHarBarnUnder18SomHarFlyttetMed]: {
                id: errorKeyHarBarnUnder18SomHarFlyttetMed,
                melding:
                    barnOgHelseTekster.radio_har_barn_under_18_som_har_flyttet_med.feilmelding[
                        locale
                    ],
            },
        };
    }

    if (
        barnOgHelse?.harBarnUnder18SomHarFlyttetMed?.verdi === 'JA' &&
        !barnOgHelse?.hvilkeBarnFlytterMed?.verdier.length
    ) {
        feil = {
            ...feil,
            [errorKeyHvilkeBarnFlytterMed]: {
                id: errorKeyHvilkeBarnFlytterMed,
                melding: barnOgHelseTekster.hvilke_barn_flytter_med.feilmelding[locale],
            },
        };
    }

    if (harBarn && !harVerdi(barnOgHelse?.harBarnHjemmeUnder4Klasse?.verdi)) {
        feil = {
            ...feil,
            [errorKeyHarBarnHjemmeUnder4Klasse]: {
                id: errorKeyHarBarnHjemmeUnder4Klasse,
                melding:
                    barnOgHelseTekster.radio_har_barn_hjemme_under_4_klasse.feilmelding[locale],
            },
        };
    }

    if (!harVerdi(barnOgHelse?.harSærligeBehovForFlereHjemreiser?.verdi)) {
        feil = {
            ...feil,
            [errorKeyHarSærligeBehovForFlereHjemreiser]: {
                id: errorKeyHarSærligeBehovForFlereHjemreiser,
                melding:
                    barnOgHelseTekster.radio_har_særlige_behov_for_flere_hjemreiser.feilmelding[
                        locale
                    ],
            },
        };
    }

    return feil;
};
