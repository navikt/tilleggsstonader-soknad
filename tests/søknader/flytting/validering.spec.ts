import { expect, test } from '@playwright/test';

import { hentDokumentasjonsbehovFlytting } from '../../../src/frontend/flytting/context/flyttingDokumentasjon';
import {
    erGyldigFlyttedato,
    feilId,
    tilDesimaltall,
    validerFlyttingDetaljer,
} from '../../../src/frontend/flytting/steg/2-flytting/validering';
import {
    egenutgiftFelter,
    FlyttingDetaljer,
    tilFlyttingDetaljerForInnsending,
} from '../../../src/frontend/flytting/typer/flyttingDetaljer';
import { EnumFelt, VerdiFelt, VedleggstypeFlytting } from '../../../src/frontend/typer/skjema';
import { Locale } from '../../../src/frontend/typer/tekst';

const felt = (verdi: string): VerdiFelt<string> => ({ verdi, label: 'Testfelt' });
const enumFelt = <T extends string>(verdi: T): EnumFelt<T> => ({
    verdi,
    label: 'Testfelt',
    svarTekst: verdi,
    alternativer: [verdi],
});
const gyldigeDetaljer = (): FlyttingDetaljer => ({
    årsak: enumFelt('AKTIVITET'),
    flyttedato: felt('2025-06-15'),
    adresse: {
        land: { label: 'Land', verdi: 'NOR', svarTekst: 'Norge' },
        gateadresse: felt('Testveien 1'),
        postnummer: felt('0123'),
        poststed: felt('Oslo'),
    },
    flyttemåte: enumFelt('FLYTTER_SELV'),
    utgifterDekketPåAnnenMåte: enumFelt('JA'),
    utgifterEgenFlytting: { avstand: felt('1,25') },
    flyttebyrå: {
        tilbud: [
            { navn: felt('Testbyrå 1'), beløp: felt('800,50') },
            { navn: felt('Testbyrå 2'), beløp: felt('400.25') },
        ],
    },
});

for (const verdi of [
    '',
    ' ',
    '-1',
    '1.234',
    '1,234',
    '1e2',
    'Infinity',
    'NaN',
    '1,2.3',
    'abc',
    '0x10',
    '1.',
    '.5',
    '9'.repeat(400),
]) {
    test(`Tallvalidering avviser ${JSON.stringify(verdi)}`, () => {
        expect(tilDesimaltall(verdi)).toBeUndefined();
    });
}

for (const [verdi, forventet] of [
    ['0', 0],
    ['0,00', 0],
    ['1.25', 1.25],
    ['1,25', 1.25],
    ['125', 125],
    ['10000000', 10000000],
] as const) {
    test(`Tallvalidering godtar ${verdi}`, () => {
        expect(tilDesimaltall(verdi)).toBe(forventet);
    });
}

test('Validering krever grunnspørsmål og adresse, men ikke skjulte grener', () => {
    const feil = validerFlyttingDetaljer(undefined, Locale.NB);
    expect(Object.keys(feil)).toEqual(
        expect.arrayContaining([
            feilId('årsak'),
            feilId('flyttedato'),
            feilId('flyttemåte'),
            feilId('utgifterDekketPåAnnenMåte'),
            feilId('adresse_land'),
            feilId('adresse_gateadresse'),
            feilId('adresse_postnummer'),
            feilId('adresse_poststed'),
        ])
    );
    expect(feil[feilId('tilbud1_beløp')]).toBeUndefined();
    expect(validerFlyttingDetaljer(gyldigeDetaljer(), Locale.NB)).toEqual({});
});

test('Flyttedato må finnes i kalenderen, men kan være i fortid og fremtid', () => {
    for (const verdi of [
        undefined,
        '',
        '2025-02-29',
        '2025-02-31',
        '2025-13-01',
        '15.06.2025',
        '2025-06-15T00:00:00',
    ]) {
        expect(erGyldigFlyttedato(verdi)).toBe(false);
    }
    for (const verdi of ['2024-02-29', '1900-01-01', '2099-12-31']) {
        expect(erGyldigFlyttedato(verdi)).toBe(true);
    }
    const detaljer = { ...gyldigeDetaljer(), årsak: enumFelt('NY_JOBB' as const) };
    expect(validerFlyttingDetaljer(detaljer, Locale.NB)).toEqual({});
});

test('Egen flytting krever positiv avstand og tillater blanke utgifter og nullbeløp', () => {
    const detaljer = gyldigeDetaljer();
    for (const verdi of ['0', '0,00', '-1', '1.234', '']) {
        detaljer.utgifterEgenFlytting = { avstand: felt(verdi) };
        expect(validerFlyttingDetaljer(detaljer, Locale.NB)[feilId('avstand')]).toBeDefined();
    }
    for (const utgift of egenutgiftFelter) {
        detaljer.utgifterEgenFlytting = { avstand: felt('0.01'), [utgift]: felt('0') };
        expect(validerFlyttingDetaljer(detaljer, Locale.NB)).toEqual({});
        detaljer.utgifterEgenFlytting[utgift] = felt('');
        expect(validerFlyttingDetaljer(detaljer, Locale.NB)).toEqual({});
        detaljer.utgifterEgenFlytting[utgift] = felt('-1');
        expect(validerFlyttingDetaljer(detaljer, Locale.NB)[feilId(utgift)]).toBeDefined();
    }
});

test('Byrå krever to komplette tilbud, men ignorerer inaktive egenutgifter', () => {
    const detaljer = gyldigeDetaljer();
    detaljer.flyttemåte = enumFelt('FLYTTEBYRÅ');
    detaljer.utgifterEgenFlytting = { avstand: felt('-1'), bom: felt('ugyldig') };
    detaljer.flyttebyrå = { tilbud: [] };
    expect(Object.keys(validerFlyttingDetaljer(detaljer, Locale.NB))).toEqual([
        feilId('tilbud1_navn'),
        feilId('tilbud1_beløp'),
        feilId('tilbud2_navn'),
        feilId('tilbud2_beløp'),
    ]);
    detaljer.flyttebyrå = {
        tilbud: [
            { navn: felt('Testbyrå 1'), beløp: felt('0') },
            { navn: felt('Testbyrå 2'), beløp: felt('0,00') },
        ],
    };
    expect(validerFlyttingDetaljer(detaljer, Locale.NB)).toEqual({});
    detaljer.flyttebyrå.tilbud[0] = { navn: felt(' '), beløp: felt('1.234') };
    expect(Object.keys(validerFlyttingDetaljer(detaljer, Locale.NB))).toEqual([
        feilId('tilbud1_navn'),
        feilId('tilbud1_beløp'),
    ]);
});

test('Innsending beholder tilbudslista og fjerner data fra inaktiv flyttemåte', () => {
    const tilbud = [
        { navn: felt('Testbyrå 1'), beløp: felt('800,50') },
        { navn: felt('Testbyrå 2'), beløp: felt('400.25') },
    ];
    const byrå = { tilbud };
    const detaljer = {
        ...gyldigeDetaljer(),
        flyttemåte: enumFelt('FLYTTEBYRÅ' as const),
        flyttebyrå: byrå,
    };

    expect(tilFlyttingDetaljerForInnsending(detaljer)).toMatchObject({
        flyttemåte: { verdi: 'FLYTTEBYRÅ' },
        flyttebyrå: { tilbud },
        utgifterEgenFlytting: undefined,
    });
});

test('Dokumentasjonsbehov følger flyttemåte og årsak', () => {
    const detaljer = gyldigeDetaljer();
    expect(
        hentDokumentasjonsbehovFlytting(detaljer.årsak?.verdi, detaljer.flyttemåte?.verdi)
    ).toEqual([{ type: VedleggstypeFlytting.UTGIFTER_EGEN_FLYTTING }]);
    detaljer.årsak = enumFelt('NY_JOBB');
    expect(
        hentDokumentasjonsbehovFlytting(detaljer.årsak.verdi, detaljer.flyttemåte?.verdi)
    ).toEqual([
        { type: VedleggstypeFlytting.UTGIFTER_EGEN_FLYTTING },
        { type: VedleggstypeFlytting.ARBEIDSKONTRAKT_FLYTTING },
    ]);

    detaljer.flyttemåte = enumFelt('FLYTTEBYRÅ');
    expect(
        hentDokumentasjonsbehovFlytting(detaljer.årsak.verdi, detaljer.flyttemåte.verdi)
    ).toEqual([
        { type: VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_1 },
        { type: VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_2 },
        { type: VedleggstypeFlytting.ARBEIDSKONTRAKT_FLYTTING },
    ]);
});
