import { validerOpphold } from './Opphold/validering';
import {
    skalTaStillingTilLandForJobberIAnnetLand,
    skalTaStillingTilLandForPengestøtte,
} from './util';
import {
    jobberIAnnetLandInnhold,
    mottarPengestøtteInnhold,
} from '../../../barnetilsyn/tekster/opphold';
import { ArbeidOgOpphold } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
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
    if (opphold.jobberIAnnetLand?.verdi === undefined) {
        feil = {
            ...feil,
            jobberIAnnetLand: {
                id: FeilIdDinSituasjon.JOBBER_I_ANNET_LAND,
                melding: jobberIAnnetLandInnhold.feilmnelding_jobber_annet_land[locale],
            },
        };
    }
    if (
        skalTaStillingTilLandForJobberIAnnetLand(opphold) &&
        !harVerdi(opphold.jobbAnnetLand?.verdi)
    ) {
        feil = {
            ...feil,
            jobbAnnetLand: {
                id: FeilIdDinSituasjon.JOBBER_I_ANNET_LAND_HVILKET_LAND,
                melding: jobberIAnnetLandInnhold.feilmelding_select_hvilket_land[locale],
            },
        };
    }
    return feil;
};

const validerMottarPengestøtte = (opphold: ArbeidOgOpphold, locale: Locale): Valideringsfeil => {
    let feil: Valideringsfeil = {};
    const harPengestøtteAnnetLand = opphold.harPengestøtteAnnetLand?.verdier || [];
    const harValgtMottarIkkeOgAnnetValg =
        harPengestøtteAnnetLand.length > 1 &&
        harPengestøtteAnnetLand.some((verdi) => verdi.verdi === 'MOTTAR_IKKE');
    if (harPengestøtteAnnetLand.length === 0) {
        feil = {
            ...feil,
            harPengestøtteAnnetLand: {
                id: FeilIdDinSituasjon.MOTTAR_DU_PENGESTØTTE,
                melding: mottarPengestøtteInnhold.feilmnelding_mottar_du_pengestøtte[locale],
            },
        };
    } else if (harValgtMottarIkkeOgAnnetValg) {
        feil = {
            ...feil,
            harPengestøtteAnnetLand: {
                id: FeilIdDinSituasjon.MOTTAR_DU_PENGESTØTTE,
                melding:
                    mottarPengestøtteInnhold.feilmnelding_mottar_ikke_pengestøtte_med_andre_valg[
                        locale
                    ],
            },
        };
    }

    if (
        skalTaStillingTilLandForPengestøtte(opphold.harPengestøtteAnnetLand) &&
        !harVerdi(opphold.pengestøtteAnnetLand?.verdi)
    ) {
        feil = {
            ...feil,
            pengestøtteAnnetLand: {
                id: FeilIdDinSituasjon.MOTTAR_DU_PENGESTØTTE_HVILKET_LAND,
                melding: mottarPengestøtteInnhold.feilmelding_select_hvilket_land[locale],
            },
        };
    }
    return feil;
};
