import {
    nullstilteReisemåteFeil,
    validerReisemåte,
} from '../../../components/Reisemåte/validering';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { erDatoEtterEllerLik } from '../../../utils/datoUtils';
import { harVerdi } from '../../../utils/typeUtils';
import { reiseinfoTekster } from '../../tekster/reiseinfo';
import { ReiseInfoReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

export const errorKeyTypeReise = (reiseId: number) => `reise_${reiseId}_typeReise`;
export const errorKeyFom = (reiseId: number) => `reise_${reiseId}_fom`;
export const errorKeyTom = (reiseId: number) => `reise_${reiseId}_tom`;

export const nullstillteReisefeil = (
    reiser: ReiseInfoReiseOppstartAvslutningHjemreise[]
): Valideringsfeil =>
    reiser.reduce(
        (acc, reise) => ({
            ...acc,
            [errorKeyTypeReise(reise._id)]: undefined,
            [errorKeyFom(reise._id)]: undefined,
            [errorKeyTom(reise._id)]: undefined,
            ...nullstilteReisemåteFeil(reise._id),
        }),
        {}
    );

export const nullstillteReisefeilForReise = (reiseId: number): Valideringsfeil => ({
    [errorKeyTypeReise(reiseId)]: undefined,
    [errorKeyFom(reiseId)]: undefined,
    [errorKeyTom(reiseId)]: undefined,
    ...nullstilteReisemåteFeil(reiseId),
});

export const validerReiseUnderRedigering = (
    reise: ReiseInfoReiseOppstartAvslutningHjemreise,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};
    const keyTypeReise = errorKeyTypeReise(reise._id);
    const keyFom = errorKeyFom(reise._id);
    const keyTom = errorKeyTom(reise._id);

    if (!harVerdi(reise.typeReise?.verdi)) {
        return {
            [keyTypeReise]: {
                id: keyTypeReise,
                melding: reiseinfoTekster.radio_type_reise.feilmelding[locale],
            },
        };
    }

    if (reise.typeReise?.verdi === 'HJEMREISE') {
        if (!harVerdi(reise.fom?.verdi)) {
            feil = {
                ...feil,
                [keyFom]: {
                    id: keyFom,
                    melding: reiseinfoTekster.dato_periode.feilmelding_fom[locale],
                },
            };
        }

        if (!harVerdi(reise.tom?.verdi)) {
            feil = {
                ...feil,
                [keyTom]: {
                    id: keyTom,
                    melding: reiseinfoTekster.dato_periode.feilmelding_tom[locale],
                },
            };
        }

        if (
            harVerdi(reise.fom?.verdi) &&
            harVerdi(reise.tom?.verdi) &&
            !erDatoEtterEllerLik(reise.fom!.verdi, reise.tom!.verdi)
        ) {
            feil = {
                ...feil,
                [keyTom]: {
                    id: keyTom,
                    melding: reiseinfoTekster.dato_periode.feilmelding_tom_før_fom[locale],
                },
            };
        }
    } else if (!harVerdi(reise.fom?.verdi)) {
        feil = {
            ...feil,
            [keyFom]: {
                id: keyFom,
                melding: reiseinfoTekster.dato_enkelt.feilmelding[locale],
            },
        };
    }

    return {
        ...feil,
        ...validerReisemåte(reise.reisemåte, locale, reise._id, reiseinfoTekster.reisemåte),
    };
};

export const validerReiser = (
    reiser: ReiseInfoReiseOppstartAvslutningHjemreise[],
    locale: Locale
): Valideringsfeil =>
    reiser.reduce(
        (acc, reise) => ({
            ...acc,
            ...validerReiseUnderRedigering(reise, locale),
        }),
        {}
    );
