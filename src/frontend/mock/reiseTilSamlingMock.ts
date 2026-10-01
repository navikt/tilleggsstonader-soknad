import { AktivitetReiseTilSamling } from '../reiseTilSamling/typer/aktivitet';
import { Avreiseadresse, Hovedytelse, Samling } from '../typer/søknad';

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
        antallKilometerEnVei: { verdi: '45', label: 'Hvor lang reisevei har du?' },
        adresse: {
            gateadresse: { verdi: 'Testveien 1', label: 'Gateadresse' },
            postnummer: { verdi: '0123', label: 'Postnummer' },
            poststed: { verdi: 'Oslo', label: 'Poststed' },
        },
        reisemåte: {
            hvilkeTransportmidlerBleBenyttet: {
                label: 'Hvilke transportmidler ble benyttet?',
                verdier: [{ verdi: 'OFFENTLIG_TRANSPORT', label: 'Offentlig transport' }],
                alternativer: ['Privat bil', 'Drosje', 'Offentlig transport'],
            },
            unntakFraOffentligTransport: {
                årsaker: {
                    label: 'Hvorfor ikke offentlig transport?',
                    verdier: [{ verdi: 'DÅRLIG_TRANSPORTTILBUD', label: 'Dårlig transporttilbud' }],
                    alternativer: [
                        'Dårlig transporttilbud',
                        'Helsemessige årsaker',
                        'Leving i bhg',
                    ],
                },
            },
            offentligTransport: {
                totalUtgifterOffentligTransport: {
                    verdi: '500',
                    label: 'Hva er totalutgiftene til offentlig transport til og fra samlingene?',
                },
            },
        },
    },
];

export const mockAvreiseadresse: Avreiseadresse = {
    skalReiseFraFolkeregistrertAdresse: {
        label: 'Skal du reise fra din folkeregistrerte adresse?',
        verdi: 'JA',
        svarTekst: 'Ja',
        alternativer: ['Ja', 'Nei'],
    },
};
