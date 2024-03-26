import {
    skalTaStillingTilLandForJobberIAnnetLand,
    skalTaStillingTilLandForPengestøtte,
    skalTaStillingTilOppholdSiste12mnd,
    skalTaStillingTilOppholdUtenforNorge,
    skalTaStillingTilPengestøtte,
} from './OppholdUtenforNorge/util';
import { skalTaStillingTilOppholdINorge } from './taStillingTilOpphold';
import { Ytelse } from './typer';
import { EnumFlereValgFelt } from '../../../typer/skjema';
import { ArbeidOgOpphold, OppholdUtenforNorge } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { erDatoEtterEllerLik } from '../../../utils/dato';
import { harVerdi } from '../../../utils/typer';
import { hovedytelseInnhold } from '../../tekster/hovedytelse';
import {
    arbeidOgOppholdInnhold,
    OppholdInnhold,
    oppholdUtenforNorgeInnhold,
} from '../../tekster/opphold';

export const errorKeyLand = (
    keyOpphold: keyof Pick<
        ArbeidOgOpphold,
        'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
    >
) => `${keyOpphold}_land`;
export const errorKeyÅrsak = (
    keyOpphold: keyof Pick<
        ArbeidOgOpphold,
        'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
    >
) => `${keyOpphold}_arsak`;
export const errorKeyFom = (
    keyOpphold: keyof Pick<
        ArbeidOgOpphold,
        'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
    >
) => `${keyOpphold}_fom`;
export const errorKeyTom = (
    keyOpphold: keyof Pick<
        ArbeidOgOpphold,
        'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
    >
) => `${keyOpphold}_tom`;

export const nullstillteOppholsfeilSiste12mnd: Valideringsfeil = {
    [errorKeyLand('oppholdUtenforNorgeSiste12mnd')]: undefined,
    [errorKeyÅrsak('oppholdUtenforNorgeSiste12mnd')]: undefined,
    [errorKeyFom('oppholdUtenforNorgeSiste12mnd')]: undefined,
    [errorKeyTom('oppholdUtenforNorgeSiste12mnd')]: undefined,
};
export const nullstillteOppholsfeilNeste12mnd: Valideringsfeil = {
    [errorKeyLand('oppholdUtenforNorgeNeste12mnd')]: undefined,
    [errorKeyÅrsak('oppholdUtenforNorgeNeste12mnd')]: undefined,
    [errorKeyFom('oppholdUtenforNorgeNeste12mnd')]: undefined,
    [errorKeyTom('oppholdUtenforNorgeNeste12mnd')]: undefined,
};

/**
 * For å ha unike feilid på felter
 */
enum FeilId {
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

const validerOpphold = (opphold: ArbeidOgOpphold, locale: Locale): Valideringsfeil => {
    let feil: Valideringsfeil = {};
    if (opphold.jobberIAnnetLandEnnNorge?.verdi === undefined) {
        feil = {
            ...feil,
            jobberIAnnetLandEnnNorge: {
                id: FeilId.JOBBER_I_ANNET_LAND,
                melding: arbeidOgOppholdInnhold.feilmnelding_jobber_annet_land_enn_norge[locale],
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
                id: FeilId.JOBBER_I_ANNET_LAND_HVILKET_LAND,
                melding:
                    arbeidOgOppholdInnhold
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
                id: FeilId.MOTTAR_DU_PENGESTØTTE,
                melding: arbeidOgOppholdInnhold.feilmnelding_mottar_du_pengestøtte[locale],
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
                id: FeilId.MOTTAR_DU_PENGESTØTTE_HVILKET_LAND,
                melding: arbeidOgOppholdInnhold.feilmelding_select_hvilket_land_pengestøtte[locale],
            },
        };
    }

    if (
        skalTaStillingTilOppholdUtenforNorge(opphold) &&
        opphold.harDuOppholdUtenforNorgeSiste12mnd?.verdi === undefined
    ) {
        feil = {
            ...feil,
            harDuOppholdUtenforNorgeSiste12mnd: {
                id: FeilId.HAR_OPPHOLD_SISTE_12_MND,
                melding: oppholdUtenforNorgeInnhold.feilmelding_radioSiste12mnd[locale],
            },
        };
    }

    const ulagretOppholdSiste12mnd = opphold.oppholdUtenforNorgeSiste12mnd.find(
        (opphold) => !opphold.lagret
    );
    if (ulagretOppholdSiste12mnd) {
        feil = {
            ...feil,
            ...validerOppholdUtenforNorgeUnderRedigering(
                ulagretOppholdSiste12mnd,
                oppholdUtenforNorgeInnhold.siste12mnd,
                locale,
                'oppholdUtenforNorgeSiste12mnd'
            ),
        };
    }

    if (
        skalTaStillingTilOppholdSiste12mnd(opphold) &&
        opphold.harDuOppholdUtenforNorgeNeste12mnd?.verdi === undefined
    ) {
        feil = {
            ...feil,
            harDuOppholdUtenforNorgeNeste12mnd: {
                id: FeilId.HAR_OPPHOLD_NESTE_12_MND,
                melding: oppholdUtenforNorgeInnhold.feilmelding_radioNeste12mnd[locale],
            },
        };
    }

    const ulagretOppholdNeste12mnd = opphold.oppholdUtenforNorgeNeste12mnd.find(
        (opphold) => !opphold.lagret
    );
    if (ulagretOppholdNeste12mnd) {
        feil = {
            ...feil,
            ...validerOppholdUtenforNorgeUnderRedigering(
                ulagretOppholdNeste12mnd,
                oppholdUtenforNorgeInnhold.neste12mnd,
                locale,
                'oppholdUtenforNorgeNeste12mnd'
            ),
        };
    }
    return feil;
};

export const validerOppholdUtenforNorgeUnderRedigering = (
    opphold: OppholdUtenforNorge,
    tekster: OppholdInnhold,
    locale: Locale,
    keyOpphold: keyof Pick<
        ArbeidOgOpphold,
        'oppholdUtenforNorgeSiste12mnd' | 'oppholdUtenforNorgeNeste12mnd'
    >
): Valideringsfeil => {
    let feil: Valideringsfeil = {};
    const feilId =
        keyOpphold === 'oppholdUtenforNorgeSiste12mnd'
            ? FeilId.OPPHOLD_SISTE_12_MND
            : FeilId.OPPHOLD_NESTE_12_MND;
    if (!harVerdi(opphold.land?.verdi)) {
        feil = {
            ...feil,
            [errorKeyLand(keyOpphold)]: {
                id: `${feilId}-1`,
                melding: tekster.feilmelding_hvilket_land[locale],
            },
        };
    }
    if ((opphold.årsak?.verdier?.length || 0) === 0) {
        feil = {
            ...feil,
            [errorKeyÅrsak(keyOpphold)]: {
                id: `${feilId}-2`,
                melding: tekster.feilmelding_årsak[locale],
            },
        };
    }
    if (!harVerdi(opphold.fom?.verdi)) {
        feil = {
            ...feil,
            [errorKeyFom(keyOpphold)]: {
                id: `${feilId}-3`,
                melding: tekster.dato.feilmelding_fom[locale],
            },
        };
    }
    if (!harVerdi(opphold.tom?.verdi)) {
        feil = {
            ...feil,
            [errorKeyTom(keyOpphold)]: {
                id: `${feilId}-4`,
                melding: tekster.dato.feilmelding_tom[locale],
            },
        };
    }
    if (harVerdi(opphold.fom?.verdi) && harVerdi(opphold.tom?.verdi)) {
        if (!erDatoEtterEllerLik(opphold.fom?.verdi || '', opphold.tom?.verdi || '')) {
            feil = {
                ...feil,
                [errorKeyTom(keyOpphold)]: {
                    id: `${feilId}-4`,
                    melding: tekster.dato.feilmelding_tom_før_fom[locale],
                },
            };
        }
    }
    return feil;
};
