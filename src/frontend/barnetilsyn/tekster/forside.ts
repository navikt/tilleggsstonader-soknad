import { TekstElement } from '../../typer/tekst';

interface ForsideInnhold {
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
    mottatt_faktura_alert_tittel: TekstElement<string>;
    mottatt_faktura_alert_innhold: TekstElement<string>;
    dine_plikter_tittel: TekstElement<string>;
    dine_plikter_innhold: TekstElement<string[]>;
    utgifter_som_dekkes_tittel: TekstElement<string>;
    utgifter_som_dekkes_innhold: TekstElement<string[]>;
    info_som_hentes_tittel: TekstElement<string>;
    info_som_hentes_innhold1: TekstElement<string>;
    info_som_hentes_innhold2: TekstElement<string[]>;
    info_som_hentes_innhold3: TekstElement<string>;
    dokumentasjon_utgifter_tittel: TekstElement<string>;
    dokumentasjon_utgifter_innhold: TekstElement<string>;
    vi_stoler_tittel: TekstElement<string>;
    vi_stoler_innhold: TekstElement<string>;
}

export const forsideTekster: ForsideInnhold = {
    veileder_tittel: {
        nb: 'Hei [0]',
    },
    veileder_innhold: {
        nb: [
            'Jeg er her for å veilede deg gjennom søknaden.',
            'Svarene dine lagres underveis, slik at du trygt kan gå tilbake og endre dem. En påbegynt søknad lagres i én måned på Ditt NAV.',
        ],
    },
    mottatt_faktura_alert_tittel: {
        nb: 'Søker du om støtte til pass av barn for nytt skole/barnehageår?',
    },
    mottatt_faktura_alert_innhold: {
        nb: 'Du må dokumentere utgiftene til barnepass for perioden du søker for. Vi anbefaler at du venter med å søke til du har fakturaen. ',
    },
    dine_plikter_tittel: {
        nb: 'Dine plikter',
    },
    dine_plikter_innhold: {
        nb: [
            'Du må gi oss riktige opplysninger i søknaden.',
            'Du må dokumentere dine utgifter til pass av barn med faktura som inneholder beløp og periode.',
            'Du må gi beskjed til oss hvis situasjonen din endrer seg. ',
            'Hvis du får penger du ikke har rett på, må du du være forberedt på å måtte betale dem tilbake.',
            'Du kan bare søke om støtte til pass av barn, hvis ingen andre har fått dekket utgiftene til pass for samme barn. ',
        ],
    },
    utgifter_som_dekkes_tittel: {
        nb: 'Hvilke utgifter dekker vi?',
    },
    utgifter_som_dekkes_innhold: {
        nb: [
            'Utgifter til mat og bleier dekkes ikke.',
            'Vi dekker 64 prosent av utgiftene du har til pass av barn, opp til en maksimumssats.',
        ],
    },
    info_som_hentes_tittel: {
        nb: 'Informasjon vi henter om deg',
    },
    info_som_hentes_innhold1: {
        nb: 'I tillegg til den informasjonen du oppgir i søknaden, henter vi: ',
    },
    info_som_hentes_innhold2: {
        nb: [
            'adressen din og opplysninger om dine barn fra Folkeregisteret',
            'informasjon om aktivitet eller utdanning som er godkjent av NAV',
        ],
    },
    info_som_hentes_innhold3: {
        nb: 'Slik behandler vi personopplysningene dine',
    },
    dokumentasjon_utgifter_tittel: {
        nb: 'Dokumentasjon av utgifter',
    },
    dokumentasjon_utgifter_innhold: {
        nb: 'Du må dokumentere utgiftene til barnepass med en faktura som inneholder barnets navn, beløp og periode. Vi dekker ikke utgifter til mat og bleier.',
    },
    vi_stoler_tittel: { nb: 'Vi stoler på deg' },
    vi_stoler_innhold: {
        nb: 'Jeg bekrefter at jeg kjenner til mine plikter og vil svare så godt jeg kan på spørsmålene i søknaden.',
    },
};
