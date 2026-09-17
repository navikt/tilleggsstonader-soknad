import { expect, test } from '@playwright/test';

import {
    AktivitetSpørsmål,
    finnAktiveAktivitetSpørsmål,
    finnAktivitetFeilnøklerSomSkalNullstilles,
    rensInaktiveAktivitetSvar,
} from '../../src/frontend/reiseTilSamlingNy/steg/2-aktivitet/aktivitetSpørsmålGraf';
import { AktivitetReiseTilSamling } from '../../src/frontend/reiseTilSamlingNy/typer/aktivitet';
import { AktivitetTypeUtdanning, AnnenAktivitetType } from '../../src/frontend/typer/aktivitet';
import { RegisterAktivitetMedLabel } from '../../src/frontend/typer/registerAktivitet';

const felt = <T extends string>(verdi: T) => ({ verdi, label: verdi });

const tomAktivitet = (): AktivitetReiseTilSamling => ({
    aktiviteter: undefined,
    annenAktivitet: undefined,
    lønnetAktivitet: undefined,
    annenAktivitetTypeUtdanning: undefined,
    tilleggsopplysningerAnnenAktivitet: undefined,
});

const mockRegisterAktiviteter: Record<string, RegisterAktivitetMedLabel> = {
    a: {
        id: 'a',
        fom: '2026-01-01',
        tom: null,
        erUtdanning: true,
        erUtdanningPåVgsNivå: false,
        typeNavn: 'Tiltak',
        label: 'Aktivitet A',
    },
};

test('bruker kontekstfaktor for første spørsmål', () => {
    const medRegister = finnAktiveAktivitetSpørsmål(tomAktivitet(), mockRegisterAktiviteter);
    const utenRegister = finnAktiveAktivitetSpørsmål(tomAktivitet(), {});

    expect(medRegister.has('VALGTE_AKTIVITETER')).toBeTruthy();
    expect(medRegister.has('ANNEN_AKTIVITET')).toBeFalsy();
    expect(utenRegister.has('ANNEN_AKTIVITET')).toBeTruthy();
    expect(utenRegister.has('VALGTE_AKTIVITETER')).toBeFalsy();
});

test('nullstiller gren for lærling når type blir annet tiltak', () => {
    const forrige: AktivitetReiseTilSamling = {
        ...tomAktivitet(),
        aktiviteter: { verdier: [felt('AKTIVITET')], label: 'Aktiviteter' },
        annenAktivitetTypeUtdanning: felt(AktivitetTypeUtdanning.VIDEREGÅENDE),
        tilleggsopplysningerAnnenAktivitet: {
            erLærlingEllerLiknende: felt('NEI'),
            fårDekketReise: undefined,
            erUnder25År: felt('JA'),
            måBetaleForReiseTilSkole: felt('JA'),
        },
    };

    const neste = rensInaktiveAktivitetSvar(
        {
            ...forrige,
            annenAktivitetTypeUtdanning: felt(AktivitetTypeUtdanning.ANNET_TILTAK),
        },
        mockRegisterAktiviteter
    );

    expect(neste.tilleggsopplysningerAnnenAktivitet).toBeUndefined();
    expect(neste.lønnetAktivitet).toBeUndefined();
    expect(
        finnAktivitetFeilnøklerSomSkalNullstilles(forrige, neste, mockRegisterAktiviteter)
    ).toEqual(
        expect.arrayContaining([
            AktivitetSpørsmål.ER_UNDER_25_ÅR,
            AktivitetSpørsmål.MÅ_BETALE_FOR_REISE_TIL_SKOLE,
        ])
    );
});

test('fjerner aktivitetsvalg når bruker går til annen aktivitet uten register', () => {
    const forrige: AktivitetReiseTilSamling = {
        ...tomAktivitet(),
        aktiviteter: { verdier: [felt('AKTIVITET')], label: 'Aktiviteter' },
    };

    const neste = rensInaktiveAktivitetSvar(
        {
            ...forrige,
            annenAktivitet: felt(AnnenAktivitetType.UTDANNING),
        },
        {}
    );

    expect(neste.aktiviteter).toBeUndefined();
    expect(neste.annenAktivitet?.verdi).toBe(AnnenAktivitetType.UTDANNING);
});
