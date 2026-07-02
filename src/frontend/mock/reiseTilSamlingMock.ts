import { AktivitetReiseTilSamling } from '../reiseTilSamling/typer/aktivitet';
import { Hovedytelse, Reiseavstand, Reisemåte, Samling } from '../typer/søknad';

export const mockHovedytelse: Hovedytelse = {
    ytelse: {
        label: 'Mottar du eller har du nylig søkt om noe av dette?',
        verdier: [{ verdi: 'AAP', label: 'Arbeidsavklaringspenger (AAP)' }],
        alternativer: ['Arbeidsavklaringspenger (AAP)'],
    },
    arbeidOgOpphold: {
        oppholdUtenforNorgeSiste12mnd: [],
        oppholdUtenforNorgeNeste12mnd: [],
    },
};

export const mockAktivitet: AktivitetReiseTilSamling = {
    aktiviteter: undefined,
    annenAktivitetTypeUtdanning: undefined,
    tilleggsopplysningerAnnenAktivitet: undefined,
    lønnetAktivitet: undefined,
    annenAktivitet: undefined,
};

export const mockSamlinger: Samling[] = [
    {
        _id: 1,
        lagret: true,
        fom: { verdi: '2025-06-01', label: 'Startdato' },
        tom: { verdi: '2025-06-05', label: 'Sluttdato' },
        erObligatorisk: {
            verdi: 'JA',
            label: 'Er samlingen obligatorisk?',
            svarTekst: 'Ja',
            alternativer: ['Ja', 'Nei'],
        },
    },
];

export const mockReiseavstand: Reiseavstand = {
    antallKilometerEnVei: { verdi: '45', label: 'Hvor lang reisevei har du?' },
    aktivitetsadresse: {
        gateadresse: { verdi: 'Testveien 1', label: 'Gateadresse' },
        postnummer: { verdi: '0123', label: 'Postnummer' },
        poststed: { verdi: 'Oslo', label: 'Poststed' },
    },
    skalReiseFraFolkeregistrertAdresse: {
        label: 'Skal du reise fra din folkeregistrerte adresse?',
        verdi: 'JA',
        svarTekst: 'Ja',
        alternativer: ['Ja', 'Nei'],
    },
};

export const mockReisemåte: Reisemåte = {
    kanReiseKollektivt: {
        label: 'Kan du reise kollektivt?',
        verdi: 'JA',
        svarTekst: 'Ja',
        alternativer: ['Ja', 'Nei'],
    },
    totalutgifterKollektivt: {
        verdi: '500',
        label: 'Hva er totalutgiftene til kollektivtransport til og fra samlingene?',
    },
};
