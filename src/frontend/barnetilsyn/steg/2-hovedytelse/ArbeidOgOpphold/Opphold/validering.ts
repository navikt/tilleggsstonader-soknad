import { skalTaStillingTilOppholdSiste12mnd } from './util';
import { ArbeidOgOpphold, OppholdUtenforNorge } from '../../../../../typer/søknad';
import { Locale } from '../../../../../typer/tekst';
import { Valideringsfeil } from '../../../../../typer/validering';
import { erDatoEtterEllerLik } from '../../../../../utils/dato';
import { harVerdi } from '../../../../../utils/typer';
import { OppholdInnhold, oppholdUtenforNorgeInnhold } from '../../../../tekster/opphold';
import { FeilIdDinSituasjon } from '../../validering';

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

export const validerOpphold = (opphold: ArbeidOgOpphold, locale: Locale): Valideringsfeil => {
    return {
        ...validerOppholdSiste12Mnd(opphold, locale),
        ...validerOppholdNeste12Mnd(opphold, locale),
    };
};

const validerOppholdSiste12Mnd = (opphold: ArbeidOgOpphold, locale: Locale): Valideringsfeil => {
    let feil: Valideringsfeil = {};
    if (opphold.harOppholdUtenforNorgeSiste12mnd?.verdi === undefined) {
        feil = {
            ...feil,
            harOppholdUtenforNorgeSiste12mnd: {
                id: FeilIdDinSituasjon.HAR_OPPHOLD_SISTE_12_MND,
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
    return feil;
};

const validerOppholdNeste12Mnd = (opphold: ArbeidOgOpphold, locale: Locale): Valideringsfeil => {
    let feil: Valideringsfeil = {};
    if (
        skalTaStillingTilOppholdSiste12mnd(opphold) &&
        opphold.harOppholdUtenforNorgeNeste12mnd?.verdi === undefined
    ) {
        feil = {
            ...feil,
            harOppholdUtenforNorgeNeste12mnd: {
                id: FeilIdDinSituasjon.HAR_OPPHOLD_NESTE_12_MND,
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
            ? FeilIdDinSituasjon.OPPHOLD_SISTE_12_MND
            : FeilIdDinSituasjon.OPPHOLD_NESTE_12_MND;
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
