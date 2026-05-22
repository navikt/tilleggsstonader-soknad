import { Samling } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { erDatoEtterEllerLik } from '../../../utils/datoUtils';
import { harVerdi } from '../../../utils/typeUtils';
import { samlingerTekster } from '../../tekster/samlinger';

export const errorKeyFom = (samlingId: number) => `samling_${samlingId}_fom`;
export const errorKeyTom = (samlingId: number) => `samling_${samlingId}_tom`;

export const nullstillteSamlingsfeil = (samlinger: Samling[]): Valideringsfeil =>
    samlinger.reduce((acc, samling) => {
        const keyFom = errorKeyFom(samling._id);
        const keyTom = errorKeyTom(samling._id);

        return {
            ...acc,
            [keyFom]: undefined,
            [keyTom]: undefined,
        };
    }, {});

export const validerSamlingUnderRedigering = (
    samling: Samling,
    locale: Locale
): Valideringsfeil => {
    const keyFom = errorKeyFom(samling._id);
    const keyTom = errorKeyTom(samling._id);
    let feil: Valideringsfeil = {};

    if (!harVerdi(samling.fom?.verdi)) {
        feil = {
            ...feil,
            [keyFom]: {
                id: keyFom,
                melding: samlingerTekster.feilmelding_startdato[locale],
            },
        };
    }

    if (!harVerdi(samling.tom?.verdi)) {
        feil = {
            ...feil,
            [keyTom]: {
                id: keyTom,
                melding: samlingerTekster.feilmelding_sluttdato[locale],
            },
        };
    }

    if (harVerdi(samling.fom?.verdi) && harVerdi(samling.tom?.verdi)) {
        if (!erDatoEtterEllerLik(samling.fom!.verdi, samling.tom!.verdi)) {
            feil = {
                ...feil,
                [keyTom]: {
                    id: keyTom,
                    melding: samlingerTekster.feilmelding_sluttdato_før_startdato[locale],
                },
            };
        }
    }

    return feil;
};

export const validerSamlinger = (samlinger: Samling[], locale: Locale): Valideringsfeil =>
    samlinger.reduce((acc, samling) => {
        return {
            ...acc,
            ...validerSamlingUnderRedigering(samling, locale),
        };
    }, {});
