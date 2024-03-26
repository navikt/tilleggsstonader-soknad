import { validerOpphold } from './Opphold/validering';
import {
    skalTaStillingTilLandForJobberIAnnetLand,
    skalTaStillingTilLandForPengestøtte,
    skalTaStillingTilPengestøtte,
} from './util';
import { ArbeidOgOpphold } from '../../../../typer/søknad';
import { Locale } from '../../../../typer/tekst';
import { Valideringsfeil } from '../../../../typer/validering';
import { harVerdi } from '../../../../utils/typer';
import { jobberDuIAnnetLandInnhold, mottarDuPengestøtteInnhold } from '../../../tekster/opphold';
import { FeilIdDinSituasjon } from '../validering';

export const validerArbeidOgOpphold = (
    opphold: ArbeidOgOpphold,
    locale: Locale
): Valideringsfeil => {
    return {
        ...validerJobberIAnnetLand(opphold, locale),
        ...validerMottarPengestøtte(opphold, locale),
        ...validerOpphold(opphold, locale),
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

const validerMottarPengestøtte = (opphold: ArbeidOgOpphold, locale: Locale): Valideringsfeil => {
    let feil: Valideringsfeil = {};
    if (
        skalTaStillingTilPengestøtte(opphold) &&
        (opphold.mottarDuPengestøtteFraAnnetLand?.verdier || []).length === 0
    ) {
        feil = {
            ...feil,
            mottarDuPengestøtteFraAnnetLand: {
                id: FeilIdDinSituasjon.MOTTAR_DU_PENGESTØTTE,
                melding: mottarDuPengestøtteInnhold.feilmnelding_mottar_du_pengestøtte[locale],
            },
        };
    }

    if (
        skalTaStillingTilPengestøtte(opphold) &&
        skalTaStillingTilLandForPengestøtte(opphold.mottarDuPengestøtteFraAnnetLand) &&
        !harVerdi(opphold.hvilketLandMottarDuPengestøtteFra?.verdi)
    ) {
        feil = {
            ...feil,
            hvilketLandMottarDuPengestøtteFra: {
                id: FeilIdDinSituasjon.MOTTAR_DU_PENGESTØTTE_HVILKET_LAND,
                melding: mottarDuPengestøtteInnhold.feilmelding_select_hvilket_land[locale],
            },
        };
    }
    return feil;
};
