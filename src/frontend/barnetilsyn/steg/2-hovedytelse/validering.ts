import { skalTaStillingTilOppholdINorge } from './taStillingTilOpphold';
import { Ytelse } from './typer';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { ArbeidOgOpphold } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

const teksterOppholdINorge = hovedytelseInnhold.arbeidOgOpphold;
export const validerHovedytelse = (
    ytelse: EnumFlereValgFelt<Ytelse> | undefined,
    opphold: ArbeidOgOpphold,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    if (ytelse === undefined || ytelse.verdier.length === 0) {
        feil = {
            ...feil,
            ytelse: { id: '1', melding: hovedytelseInnhold.hovedytelse_feilmelding[locale] },
        };
    }

    const skalTaStillingTilOpphold = ytelse ? skalTaStillingTilOppholdINorge(ytelse) : false;
    if (skalTaStillingTilOpphold) {
        if (opphold.jobberIAnnetLandEnnNorge?.verdi === undefined) {
            feil = {
                ...feil,
                jobberIAnnetLandEnnNorge: {
                    id: '2',
                    melding: teksterOppholdINorge.feilmnelding_jobber_annet_land_enn_norge[locale],
                },
            };
        }
        if (
            opphold.jobberIAnnetLandEnnNorge?.verdi === 'JA' &&
            opphold.hvilketLandJobberIAnnetLandEnnNorge?.verdi === undefined
        ) {
            feil = {
                ...feil,
                hvilketLandJobberIAnnetLandEnnNorge: {
                    id: '3',
                    melding:
                        teksterOppholdINorge
                            .feilmelding_select_hvilket_land_jobber_i_annet_land_label[locale],
                },
            };
        }
    }
    return feil;
};
