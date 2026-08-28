import type { AktivitetReiseTilSamling } from '../reiseTilSamling/typer/aktivitet';
import type { Avreiseadresse, Hovedytelse, Reisemåte, Samling } from '../typer/søknad';

export const mockHovedytelse: Hovedytelse = {
    ytelse: {
        label: 'Mottar du eller har du nylig søkt om noe av dette?',
        verdier: [{ verdi: 'AAP', label: 'Arbeidsavklaringspenger (AAP)' }],
        alternativer: ['Arbeidsavklaringspenger (AAP)']
    },
    arbeidOgOpphold: {
        oppholdUtenforNorgeSiste12mnd: [],
        oppholdUtenforNorgeNeste12mnd: []
    }
};

export const mockAktivitet: AktivitetReiseTilSamling = {
    aktiviteter: undefined,
    annenAktivitetTypeUtdanning: undefined,
    tilleggsopplysningerAnnenAktivitet: undefined,
    lønnetAktivitet: undefined,
    annenAktivitet: undefined
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
            alternativer: ['Ja', 'Nei']
        },
        antallKilometerEnVei: { verdi: '45', label: 'Hvor lang reisevei har du?' },
        adresse: {
            gateadresse: { verdi: 'Testveien 1', label: 'Gateadresse' },
            postnummer: { verdi: '0123', label: 'Postnummer' },
            poststed: { verdi: 'Oslo', label: 'Poststed' }
        }
    }
];

export const mockAvreiseadresse: Avreiseadresse = {
    skalReiseFraFolkeregistrertAdresse: {
        label: 'Skal du reise fra din folkeregistrerte adresse?',
        verdi: 'JA',
        svarTekst: 'Ja',
        alternativer: ['Ja', 'Nei']
    }
};

export const mockReisemåte: Reisemåte = {
    kanReiseMedOffentligTransport: {
        label: 'Kan du reise med offentlig transport?',
        verdi: 'JA',
        svarTekst: 'Ja',
        alternativer: ['Ja', 'Nei']
    },
    totalUtgifterOffentligTransport: {
        verdi: '500',
        label: 'Hva er totalutgiftene til offentlig transport til og fra samlingene?'
    }
};
