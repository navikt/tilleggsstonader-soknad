import { FeilId, validerOpphold } from './OppholdUtenforNorge/validering';
import { skalTaStillingTilOppholdINorge } from './taStillingTilOpphold';
import { Ytelse } from './typer';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { ArbeidOgOpphold } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

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
                id: FeilId.YTELSE,
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
