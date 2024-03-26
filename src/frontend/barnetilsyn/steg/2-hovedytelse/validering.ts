import { validerOpphold } from './OppholdUtenforNorge/validering';
import { skalTaStillingTilOppholdINorge } from './taStillingTilOpphold';
import { Ytelse } from './typer';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { ArbeidOgOpphold } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

/**
 * For å ha unike feilid på felter
 */
export enum FeilIdDinSituasjon {
    YTELSE = '1',
    JOBBER_I_ANNET_LAND = '2',
    JOBBER_I_ANNET_LAND_HVILKET_LAND = '3',
    MOTTAR_DU_PENGESTØTTE = '4',
    MOTTAR_DU_PENGESTØTTE_HVILKET_LAND = '5',
    HAR_OPPHOLD_SISTE_12_MND = '6',
    OPPHOLD_SISTE_12_MND = '7',
    HAR_OPPHOLD_NESTE_12_MND = '8',
    OPPHOLD_NESTE_12_MND = '9',
}

export const validerHovedytelse = (
    ytelse: EnumFlereValgFelt<Ytelse> | undefined,
    opphold: ArbeidOgOpphold,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (ytelse === undefined || ytelse.verdier.length === 0) {
        feil = {
            ...feil,
            ytelse: {
                id: FeilIdDinSituasjon.YTELSE,
                melding: hovedytelseInnhold.hovedytelse_feilmelding[locale],
            },
        };
    }

    const skalTaStillingTilOpphold = ytelse ? skalTaStillingTilOppholdINorge(ytelse) : false;
    if (skalTaStillingTilOpphold) {
        feil = {
            ...feil,
            ...validerOpphold(opphold, locale),
        };
    }
    return feil;
};
