import { expect, test } from '@playwright/test';

import { opprettDokumentasjonsfelt } from '../../../src/frontend/components/Vedlegg/VedleggUtils';
import {
    hentAktivDokumentasjon,
    hentDokumentasjonsbehovFlytting,
    oppdaterAktivDokumentasjon,
} from '../../../src/frontend/flytting/context/flyttingDokumentasjon';
import {
    erGyldigFlyttedato,
    feilId,
    harValgtDyrereTilbud,
    tilDesimaltall,
    validerFlyttingDetaljer,
} from '../../../src/frontend/flytting/steg/2-flytting/validering';
import {
    egenutgiftFelter,
    FlyttingDetaljer,
} from '../../../src/frontend/flytting/typer/flyttingDetaljer';
import {
    DokumentasjonFelt,
    EnumFelt,
    VerdiFelt,
    VedleggstypeFlytting,
} from '../../../src/frontend/typer/skjema';
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
        tilbud1: { navn: felt('Testbyrå 1'), beløp: felt('800,50') },
        tilbud2: { navn: felt('Testbyrå 2'), beløp: felt('400.25') },
        valgtTilbud: enumFelt('TILBUD_1'),
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
    expect(feil[feilId('førsteArbeidsdag')]).toBeUndefined();
    expect(feil[feilId('tilbud1_beløp')]).toBeUndefined();
    expect(validerFlyttingDetaljer(gyldigeDetaljer(), Locale.NB)).toEqual({});
});

test('Datoer må finnes i kalenderen, men kan være i fortid og fremtid', () => {
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
    expect(validerFlyttingDetaljer(detaljer, Locale.NB)[feilId('førsteArbeidsdag')]).toBeDefined();
    detaljer.førsteArbeidsdag = felt('1900-01-01');
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

test('Byrå krever to komplette tilbud og valg, men ignorerer inaktive egenutgifter', () => {
    const detaljer = gyldigeDetaljer();
    detaljer.flyttemåte = enumFelt('FLYTTEBYRÅ');
    detaljer.utgifterEgenFlytting = { avstand: felt('-1'), bom: felt('ugyldig') };
    detaljer.flyttebyrå = {};
    expect(Object.keys(validerFlyttingDetaljer(detaljer, Locale.NB))).toEqual([
        feilId('tilbud1_navn'),
        feilId('tilbud1_beløp'),
        feilId('tilbud2_navn'),
        feilId('tilbud2_beløp'),
        feilId('valgtTilbud'),
    ]);
    detaljer.flyttebyrå = {
        tilbud1: { navn: felt('Testbyrå 1'), beløp: felt('0') },
        tilbud2: { navn: felt('Testbyrå 2'), beløp: felt('0,00') },
        valgtTilbud: enumFelt('TILBUD_2'),
    };
    expect(validerFlyttingDetaljer(detaljer, Locale.NB)).toEqual({});
    detaljer.flyttebyrå.tilbud1 = { navn: felt(' '), beløp: felt('1.234') };
    expect(Object.keys(validerFlyttingDetaljer(detaljer, Locale.NB))).toEqual([
        feilId('tilbud1_navn'),
        feilId('tilbud1_beløp'),
    ]);
});

test('Dyrere tilbud varsles, men like, billigere og ugyldige beløp varsles ikke', () => {
    const detaljer = gyldigeDetaljer();
    expect(harValgtDyrereTilbud(detaljer.flyttebyrå)).toBe(true);
    const byrå = { ...detaljer.flyttebyrå, valgtTilbud: enumFelt('TILBUD_2' as const) };
    expect(harValgtDyrereTilbud(byrå)).toBe(false);
    byrå.tilbud2 = { beløp: felt('800.50') };
    expect(harValgtDyrereTilbud(byrå)).toBe(false);
    byrå.tilbud2 = { beløp: felt('800,51') };
    expect(harValgtDyrereTilbud(byrå)).toBe(true);
    byrå.tilbud1 = { beløp: felt('ugyldig') };
    expect(harValgtDyrereTilbud(byrå)).toBe(false);
    expect(harValgtDyrereTilbud(undefined)).toBe(false);
});

test('Tilbud sammenlignes nøyaktig også når Number avrunder bort forskjellen', () => {
    expect(
        harValgtDyrereTilbud({
            tilbud1: { beløp: felt('9007199254740993,01') },
            tilbud2: { beløp: felt('9007199254740993.00') },
            valgtTilbud: enumFelt('TILBUD_1'),
        })
    ).toBe(true);
});

test('Dokumentasjonsbehov følger flyttemåten, ikke bevarte tilbud i inaktiv gren', () => {
    const detaljer = gyldigeDetaljer();
    expect(hentDokumentasjonsbehovFlytting(detaljer)).toEqual([]);
    detaljer.flyttemåte = enumFelt('FLYTTEBYRÅ');
    expect(hentDokumentasjonsbehovFlytting(detaljer)).toEqual([
        { type: VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_1 },
        { type: VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_2 },
    ]);
});

test('Oppdatering av aktive vedlegg beholder inaktive tilbud, men respekterer sletting', () => {
    const detaljer = gyldigeDetaljer();
    detaljer.flyttemåte = enumFelt('FLYTTEBYRÅ');
    const behov = hentDokumentasjonsbehovFlytting(detaljer);
    const førsteTilbud: DokumentasjonFelt = {
        type: VedleggstypeFlytting.TILBUD_FLYTTEBYRÅ_1,
        label: 'Tilbud fra flyttebyrå 1',
        opplastedeVedlegg: [{ id: 'tilbud-1', navn: 'tilbud1.png' }],
    };
    const tidligere = opprettDokumentasjonsfelt(behov, [førsteTilbud], Locale.NB);
    expect(tidligere).toHaveLength(2);
    expect(tidligere[0].opplastedeVedlegg).toEqual(førsteTilbud.opplastedeVedlegg);

    const egenFlytting = oppdaterAktivDokumentasjon(tidligere, [], []);
    expect(egenFlytting).toEqual(tidligere);
    expect(hentAktivDokumentasjon(egenFlytting, [])).toEqual([]);

    const tilbakeTilByrå = opprettDokumentasjonsfelt(behov, egenFlytting, Locale.NB);
    expect(tilbakeTilByrå).toEqual(tidligere);
    const etterSletting = tilbakeTilByrå.map((dok) => ({ ...dok, opplastedeVedlegg: [] }));
    expect(oppdaterAktivDokumentasjon(tilbakeTilByrå, etterSletting, behov)).toEqual(etterSletting);
});
