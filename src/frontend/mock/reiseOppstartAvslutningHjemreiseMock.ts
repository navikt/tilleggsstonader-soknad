import {
    AdresseReiseOppstartAvslutningHjemreise,
    BarnOgHelseReiseOppstartAvslutningHjemreise,
} from '../reiseOppstartAvslutningHjemreise/typer/søknad';
import { AktivitetFelles, Hovedytelse } from '../typer/søknad';

export const mockHovedytelseReiseOppstartAvslutningHjemreise: Hovedytelse = {
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

export const mockAktivitetReiseOppstartAvslutningHjemreise: AktivitetFelles = {
    aktiviteter: undefined,
    annenAktivitet: undefined,
    lønnetAktivitet: undefined,
};

export const mockAdresserReiseOppstartAvslutningHjemreise: AdresseReiseOppstartAvslutningHjemreise =
    {
        måBoBorteHjemmefra: {
            label: 'Må du midlertidig bo borte hjemmefra for å delta på denne aktiviteten?',
            verdi: 'JA',
            svarTekst: 'Ja',
            alternativer: ['Ja', 'Nei'],
        },
        fomFlyttedato: { label: 'Fra dato', verdi: '2025-08-01' },
        tomFlyttedato: { label: 'Til dato', verdi: '2025-12-20' },
        skalReiseFraFolkeregistrertAdresse: {
            label: 'Tilsvarer denne adressen adressen du flyttet fra?',
            verdi: 'NEI',
            svarTekst: 'Nei',
            alternativer: ['Ja', 'Nei'],
        },
        adresseOriginaltBosted: {
            land: { label: 'Velg land', verdi: 'NOR', svarTekst: 'Norge' },
            gateadresse: { label: 'Gateadresse', verdi: 'Originalgata 1' },
            postnummer: { label: 'Postnummer', verdi: '0123' },
            poststed: { label: 'Poststed', verdi: 'Oslo' },
        },
        adresseMidlertidigBosted: {
            land: { label: 'Velg land', verdi: 'NOR', svarTekst: 'Norge' },
            gateadresse: { label: 'Gateadresse', verdi: 'Midlertidig vei 2' },
            postnummer: { label: 'Postnummer', verdi: '5003' },
            poststed: { label: 'Poststed', verdi: 'Bergen' },
        },
    };

export const mockBarnOgHelseReiseOppstartAvslutningHjemreise: BarnOgHelseReiseOppstartAvslutningHjemreise =
    {
        harBarnUnder18SomHarFlyttetMed: {
            label: 'Har du ett eller flere barn under 18 år som har flyttet med deg?',
            verdi: 'JA',
            svarTekst: 'Ja',
            alternativer: ['Ja', 'Nei'],
        },
        hvilkeBarnFlytterMed: undefined,
        harBarnHjemmeUnder4Klasse: {
            label: 'Har du barn hjemme som går i 1. til 4. klasse?',
            verdi: 'NEI',
            svarTekst: 'Nei',
            alternativer: ['Ja', 'Nei'],
        },
        harSærligeBehovForFlereHjemreiser: {
            label: 'Har du særlige behov som gir behov for flere hjemreiser?',
            verdi: 'NEI',
            svarTekst: 'Nei',
            alternativer: ['Ja', 'Nei'],
        },
    };
