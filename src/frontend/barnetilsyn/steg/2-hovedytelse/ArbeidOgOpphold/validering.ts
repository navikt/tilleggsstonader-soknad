import { skalTaStillingTilLandForJobberIAnnetLand } from './util';
import { ArbeidOgOpphold } from '../../../../typer/søknad';
import { Locale } from '../../../../typer/tekst';
import { Valideringsfeil } from '../../../../typer/validering';
import { harVerdi } from '../../../../utils/typer';
import { jobberDuIAnnetLandInnhold } from '../../../tekster/opphold';
import { FeilIdDinSituasjon } from '../validering';

export const validerArbeidOgOpphold = (
    opphold: ArbeidOgOpphold,
    locale: Locale
): Valideringsfeil => {
    return {
        ...validerJobberIAnnetLand(opphold, locale),
    };
};

const validerJobberIAnnetLand = (opphold: ArbeidOgOpphold, locale: Locale): Valideringsfeil => {
    let feil: Valideringsfeil = {};
    if (opphold.jobberIAnnetLandEnnNorge?.verdi === undefined) {
        feil = {
            ...feil,
            jobberIAnnetLandEnnNorge: {
                id: FeilIdDinSituasjon.JOBBER_I_ANNET_LAND,
                melding: jobberDuIAnnetLandInnhold.feilmnelding_jobber_annet_land[locale],
            },
        };
    }
    if (
        skalTaStillingTilLandForJobberIAnnetLand(opphold) &&
        !harVerdi(opphold.hvilketLandJobberIAnnetLandEnnNorge?.verdi)
    ) {
        feil = {
            ...feil,
            hvilketLandJobberIAnnetLandEnnNorge: {
                id: FeilIdDinSituasjon.JOBBER_I_ANNET_LAND_HVILKET_LAND,
                melding: jobberDuIAnnetLandInnhold.feilmelding_select_hvilket_land[locale],
            },
        };
    }
    return feil;
};
