import {
    skalViseAktivitetTypeUtdanningValg,
    skalViseArbeidsrettedeAktiviteter,
    skalViseErLærlingEllerLiknende,
    skalViseErUnder25År,
    skalViseFårDekketReise,
    skalViseLønnetTiltak,
    skalViseMåBetaleForReiseTilSkole,
} from './synlighet';
import { erLærlingEllerLiknendeTekster } from '../../../components/Aktivitet/ErLærlingEllerLiknende';
import {
    filtrerFeilTilAktiveNoder,
    finnAktiveNoder,
    finnInaktiveNoder,
    SpørsmålsgrafNode,
    validerAktiveGrafnoder,
} from '../../../felles/spørsmålsgraf/traversering';
import { RegisterAktivitetMedLabel } from '../../../typer/registerAktivitet';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
import { aktivitetTekster } from '../../tekster/aktivitet';
import { AktivitetReiseTilSamling } from '../../typer/aktivitet';

export const AktivitetSpørsmål = {
    VALGTE_AKTIVITETER: 'VALGTE_AKTIVITETER',
    ANNEN_AKTIVITET: 'ANNEN_AKTIVITET',
    AKTIVITET_TYPE_UTDANNING: 'AKTIVITET_TYPE_UTDANNING',
    ER_LÆRLING_ELLER_LIKNENDE: 'ER_LÆRLING_ELLER_LIKNENDE',
    FÅR_DEKKET_REISE: 'FÅR_DEKKET_REISE',
    ER_UNDER_25_ÅR: 'ER_UNDER_25_ÅR',
    MÅ_BETALE_FOR_REISE_TIL_SKOLE: 'MÅ_BETALE_FOR_REISE_TIL_SKOLE',
    LØNNET_AKTIVITET: 'LØNNET_AKTIVITET',
} as const;

export type AktivitetSpørsmålNøkkel = (typeof AktivitetSpørsmål)[keyof typeof AktivitetSpørsmål];

const {
    AKTIVITET_TYPE_UTDANNING,
    ANNEN_AKTIVITET,
    ER_LÆRLING_ELLER_LIKNENDE,
    ER_UNDER_25_ÅR,
    FÅR_DEKKET_REISE,
    LØNNET_AKTIVITET,
    MÅ_BETALE_FOR_REISE_TIL_SKOLE,
    VALGTE_AKTIVITETER,
} = AktivitetSpørsmål;

export type AktivitetGrafKontekst = {
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>;
};

export const aktivitetRenderRekkefølge: AktivitetSpørsmålNøkkel[] =
    Object.values(AktivitetSpørsmål);
const aktivitetSpørsmålNodeSet = new Set<AktivitetSpørsmålNøkkel>(aktivitetRenderRekkefølge);
export const erAktivitetSpørsmålNode = (nodeId: string): nodeId is AktivitetSpørsmålNøkkel =>
    aktivitetSpørsmålNodeSet.has(nodeId as AktivitetSpørsmålNøkkel);

const fellesGren: SpørsmålsgrafNode<
    AktivitetReiseTilSamling,
    AktivitetGrafKontekst,
    AktivitetSpørsmålNøkkel
>[] = [
    {
        id: AKTIVITET_TYPE_UTDANNING,
        når: (aktivitet) =>
            skalViseAktivitetTypeUtdanningValg(aktivitet.annenAktivitet, aktivitet.aktiviteter),
        validate: (aktivitet, _context, locale) =>
            !harVerdi(aktivitet.annenAktivitetTypeUtdanning?.verdi)
                ? aktivitetTekster.radio_type_arbeidsrettede_aktiviteter.feilmelding[locale]
                : undefined,
        barn: [
            {
                id: ER_LÆRLING_ELLER_LIKNENDE,
                når: (aktivitet) =>
                    skalViseErLærlingEllerLiknende(aktivitet.annenAktivitetTypeUtdanning),
                validate: (aktivitet, _context, locale) =>
                    !harVerdi(
                        aktivitet.tilleggsopplysningerAnnenAktivitet?.erLærlingEllerLiknende?.verdi
                    )
                        ? erLærlingEllerLiknendeTekster.radio_lærling_etc.feilmelding[locale]
                        : undefined,
                barn: [
                    {
                        id: FÅR_DEKKET_REISE,
                        når: (aktivitet) =>
                            skalViseFårDekketReise(
                                aktivitet.tilleggsopplysningerAnnenAktivitet?.erLærlingEllerLiknende
                            ),
                        validate: (aktivitet, _context, locale) =>
                            !harVerdi(
                                aktivitet.tilleggsopplysningerAnnenAktivitet?.fårDekketReise?.verdi
                            )
                                ? aktivitetTekster.radio_dekket_reise.feilmelding[locale]
                                : undefined,
                    },
                    {
                        id: ER_UNDER_25_ÅR,
                        når: (aktivitet) =>
                            skalViseErUnder25År(
                                aktivitet.tilleggsopplysningerAnnenAktivitet?.erLærlingEllerLiknende
                            ),
                        validate: (aktivitet, _context, locale) =>
                            !harVerdi(
                                aktivitet.tilleggsopplysningerAnnenAktivitet?.erUnder25År?.verdi
                            )
                                ? aktivitetTekster.radio_under_25_år.feilmelding[locale]
                                : undefined,
                        barn: [
                            {
                                id: MÅ_BETALE_FOR_REISE_TIL_SKOLE,
                                når: (aktivitet) =>
                                    skalViseMåBetaleForReiseTilSkole(
                                        aktivitet.tilleggsopplysningerAnnenAktivitet?.erUnder25År
                                    ),
                                validate: (aktivitet, _context, locale) =>
                                    !harVerdi(
                                        aktivitet.tilleggsopplysningerAnnenAktivitet
                                            ?.måBetaleForReiseTilSkole?.verdi
                                    )
                                        ? aktivitetTekster.radio_må_betale_for_reise_til_skole
                                              .feilmelding[locale]
                                        : undefined,
                            },
                        ],
                    },
                ],
            },
            {
                id: LØNNET_AKTIVITET,
                når: (aktivitet) => skalViseLønnetTiltak(aktivitet.annenAktivitetTypeUtdanning),
                validate: (aktivitet, _context, locale) =>
                    !harVerdi(aktivitet.lønnetAktivitet?.verdi)
                        ? aktivitetTekster.radio_lønnet_tiltak.feilmelding[locale]
                        : undefined,
            },
        ],
    },
];

const aktivitetGraf: SpørsmålsgrafNode<
    AktivitetReiseTilSamling,
    AktivitetGrafKontekst,
    AktivitetSpørsmålNøkkel
> = {
    id: VALGTE_AKTIVITETER,
    når: (_aktivitet, context) => skalViseArbeidsrettedeAktiviteter(context.registerAktiviteter),
    validate: (aktivitet, _context, locale) =>
        !aktivitet.aktiviteter || aktivitet.aktiviteter.verdier.length === 0
            ? aktivitetTekster.checkbox_velge_aktivitet_feilmelding[locale]
            : undefined,
    barn: fellesGren,
};

const annenAktivitetGraf: SpørsmålsgrafNode<
    AktivitetReiseTilSamling,
    AktivitetGrafKontekst,
    AktivitetSpørsmålNøkkel
> = {
    id: ANNEN_AKTIVITET,
    når: (_aktivitet, context) => !skalViseArbeidsrettedeAktiviteter(context.registerAktiviteter),
    validate: (aktivitet, _context, locale) =>
        !harVerdi(aktivitet.annenAktivitet?.verdi)
            ? aktivitetTekster.radio_annet_uten_registeraktivitet.feilmelding[locale]
            : undefined,
    barn: fellesGren,
};

export const aktivitetSpørsmålGrafRøtter = [aktivitetGraf, annenAktivitetGraf] as const;

export const finnAktiveAktivitetSpørsmål = (
    aktivitet: AktivitetReiseTilSamling,
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>
): Set<AktivitetSpørsmålNøkkel> => {
    const context = { registerAktiviteter };
    const aktiveFraRegister = finnAktiveNoder(aktivitetGraf, aktivitet, context);
    const aktiveFraAnnen = finnAktiveNoder(annenAktivitetGraf, aktivitet, context);
    return new Set([...aktiveFraRegister, ...aktiveFraAnnen]);
};

export const validerAktivitetReiseTilSamling = (
    aktivitet: AktivitetReiseTilSamling,
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>,
    locale: Locale
): Valideringsfeil => {
    const context = { registerAktiviteter };
    return {
        ...validerAktiveGrafnoder(aktivitetGraf, aktivitet, context, locale),
        ...validerAktiveGrafnoder(annenAktivitetGraf, aktivitet, context, locale),
    };
};

export const rensInaktiveAktivitetSvar = (
    aktivitet: AktivitetReiseTilSamling,
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>
): AktivitetReiseTilSamling => {
    const aktive = finnAktiveAktivitetSpørsmål(aktivitet, registerAktiviteter);
    const tilleggsopplysninger = {
        erLærlingEllerLiknende: aktive.has(ER_LÆRLING_ELLER_LIKNENDE)
            ? aktivitet.tilleggsopplysningerAnnenAktivitet?.erLærlingEllerLiknende
            : undefined,
        fårDekketReise: aktive.has(FÅR_DEKKET_REISE)
            ? aktivitet.tilleggsopplysningerAnnenAktivitet?.fårDekketReise
            : undefined,
        erUnder25År: aktive.has(ER_UNDER_25_ÅR)
            ? aktivitet.tilleggsopplysningerAnnenAktivitet?.erUnder25År
            : undefined,
        måBetaleForReiseTilSkole: aktive.has(MÅ_BETALE_FOR_REISE_TIL_SKOLE)
            ? aktivitet.tilleggsopplysningerAnnenAktivitet?.måBetaleForReiseTilSkole
            : undefined,
    };

    const harTilleggsopplysninger = Object.values(tilleggsopplysninger).some(
        (value) => value !== undefined
    );

    return {
        ...aktivitet,
        aktiviteter: aktive.has(VALGTE_AKTIVITETER) ? aktivitet.aktiviteter : undefined,
        annenAktivitet: aktive.has(ANNEN_AKTIVITET) ? aktivitet.annenAktivitet : undefined,
        annenAktivitetTypeUtdanning: aktive.has(AKTIVITET_TYPE_UTDANNING)
            ? aktivitet.annenAktivitetTypeUtdanning
            : undefined,
        lønnetAktivitet: aktive.has(LØNNET_AKTIVITET) ? aktivitet.lønnetAktivitet : undefined,
        tilleggsopplysningerAnnenAktivitet: harTilleggsopplysninger
            ? tilleggsopplysninger
            : undefined,
    };
};

export const finnAktivitetFeilnøklerSomSkalNullstilles = (
    forrige: AktivitetReiseTilSamling,
    neste: AktivitetReiseTilSamling,
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>
): string[] => {
    const context = { registerAktiviteter };
    const fraRegister = finnInaktiveNoder(aktivitetGraf, forrige, neste, context);
    const fraAnnen = finnInaktiveNoder(annenAktivitetGraf, forrige, neste, context);
    return [...new Set([...fraRegister, ...fraAnnen])];
};

export const filtrerFeilTilAktiveAktivitetSpørsmål = (
    feil: Valideringsfeil,
    aktivitet: AktivitetReiseTilSamling,
    registerAktiviteter: Record<string, RegisterAktivitetMedLabel>
): Valideringsfeil =>
    filtrerFeilTilAktiveNoder(feil, finnAktiveAktivitetSpørsmål(aktivitet, registerAktiviteter));
