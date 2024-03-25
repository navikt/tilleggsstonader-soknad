import { skalTaStillingTilOppholdINorge } from './taStillingTilOpphold';
import { Ytelse } from './typer';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { ArbeidOgOpphold, MottarPengestøtteTyper } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typer';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';

const teksterOppholdINorge = hovedytelseInnhold.arbeidOgOpphold;

export const skalTaStillingTilPengestøtte = (opphold: ArbeidOgOpphold) =>
    opphold?.jobberIAnnetLandEnnNorge?.verdi === 'NEI' ||
    harVerdi(opphold.hvilketLandJobberIAnnetLandEnnNorge?.verdi);

const mottarPengestøtteTyperSomMåSåTaStillingTilLand: MottarPengestøtteTyper[] = [
    'SYKEPENGER',
    'PENSJON',
    'ANNEN_PENGESTØTTE',
];
export const skalTaStillingTilLandForPengestøtte = (
    verdier: EnumFlereValgFelt<MottarPengestøtteTyper> | undefined
) =>
    (verdier?.verdier || []).some(
        (verdi) => mottarPengestøtteTyperSomMåSåTaStillingTilLand.indexOf(verdi.verdi) > -1
    );

export const skalTaStillingTilOppholdUtenforNorge = (opphold: ArbeidOgOpphold) =>
    (opphold.mottarDuPengestøtteFraAnnetLand?.verdier || []).length > 0 &&
    !skalTaStillingTilLandForPengestøtte(opphold.mottarDuPengestøtteFraAnnetLand);

export const skalTaStillingTilOppholdsland = (opphold: ArbeidOgOpphold) =>
    opphold.oppholdUtenforNorge?.verdi === 'JA';

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
            !harVerdi(opphold.hvilketLandJobberIAnnetLandEnnNorge?.verdi)
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

        if (
            skalTaStillingTilPengestøtte(opphold) &&
            (opphold.mottarDuPengestøtteFraAnnetLand?.verdier || []).length === 0
        ) {
            feil = {
                ...feil,
                mottarDuPengestøtteFraAnnetLand: {
                    id: '4',
                    melding: teksterOppholdINorge.feilmnelding_mottar_du_pengestøtte[locale],
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
                    id: '5',
                    melding:
                        teksterOppholdINorge.feilmelding_select_hvilket_land_pengestøtte[locale],
                },
            };
        }

        if (
            skalTaStillingTilOppholdUtenforNorge(opphold) &&
            opphold.oppholdUtenforNorge?.verdi === undefined
        ) {
            feil = {
                ...feil,
                oppholdUtenforNorgeSiste12Mnd: {
                    id: '6',
                    melding:
                        teksterOppholdINorge.feilmnelding_har_du_oppholdt_deg_utenfor_norge[locale],
                },
            };
        }
        if (
            skalTaStillingTilOppholdsland(opphold) &&
            !harVerdi(opphold.hvilketLandOppholdUtenforNorge?.verdi)
        ) {
            feil = {
                ...feil,
                hvilketLandOppholdUtenforNorge: {
                    id: '7',
                    melding:
                        teksterOppholdINorge.feilmelding_select_hvilket_land_opphold_utenfor_norge[
                            locale
                        ],
                },
            };
        }
    }
    return feil;
};
