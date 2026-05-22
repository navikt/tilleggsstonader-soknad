import { Samling } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { erDatoEtterEllerLik } from '../../../utils/datoUtils';
import { harVerdi } from '../../../utils/typeUtils';
import { samlingerTekster } from '../../tekster/samlinger';

export const errorKeyFom = 'samling_fom';
export const errorKeyTom = 'samling_tom';

export const nullstillteSamlingsfeil: Valideringsfeil = {
    [errorKeyFom]: undefined,
    [errorKeyTom]: undefined,
};

export const validerSamlingUnderRedigering = (
    samling: Samling,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (!harVerdi(samling.fom?.verdi)) {
        feil = {
            ...feil,
            [errorKeyFom]: {
                id: errorKeyFom,
                melding: samlingerTekster.feilmelding_startdato[locale],
            },
        };
    }

    if (!harVerdi(samling.tom?.verdi)) {
        feil = {
            ...feil,
            [errorKeyTom]: {
                id: errorKeyTom,
                melding: samlingerTekster.feilmelding_sluttdato[locale],
            },
        };
    }

    if (harVerdi(samling.fom?.verdi) && harVerdi(samling.tom?.verdi)) {
        if (!erDatoEtterEllerLik(samling.fom!.verdi, samling.tom!.verdi)) {
            feil = {
                ...feil,
                [errorKeyTom]: {
                    id: errorKeyTom,
                    melding: samlingerTekster.feilmelding_sluttdato_før_startdato[locale],
                },
            };
        }
    }

    return feil;
};

export const validerSamlinger = (samlinger: Samling[], locale: Locale): Valideringsfeil => {
    const ulagretSamling = samlinger.find((s) => !s.lagret);
    if (ulagretSamling) {
        return validerSamlingUnderRedigering(ulagretSamling, locale);
    }
    return {};
};
