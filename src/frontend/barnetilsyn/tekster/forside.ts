import { TekstElement } from '../../typer/tekst';

interface ForsideInnhold {
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
    mottatt_faktura_alert_tittel: TekstElement<string>;
    mottatt_faktura_alert_innhold: TekstElement<string>;
    dine_plikter_tittel: TekstElement<string>;
    dine_plikter_innhold: TekstElement<string[]>;
    utgifter_som_dekkes_tittel: TekstElement<string>;
    utgifter_som_dekkes_innhold: TekstElement<string>;
    info_som_hentes_tittel: TekstElement<string>;
    info_som_hentes_innhold1: TekstElement<string>;
    info_som_hentes_innhold2: TekstElement<string[]>;
    info_som_hentes_innhold3: TekstElement<string>;
    dokumentasjon_utgifter_tittel: TekstElement<string>;
    dokumentasjon_utgifter_innhold: TekstElement<string>;
}

export const forsideTekster: ForsideInnhold = {
    veileder_tittel: {
        nb: 'Hei [0]!',
    },
    veileder_innhold: {
        nb: [
            'Jeg er her for å veilede deg gjennom søknaden.',
            'Svarene dine lagres underveis, slik at du trygt kan gå tilbake og endre dem. En påbegynt søknad lagres i én uke på Ditt NAV.',
        ],
    },
    mottatt_faktura_alert_tittel: {
        nb: 'Skal du søke for nytt skole/barnehageår?',
    },
    mottatt_faktura_alert_innhold: {
        nb: 'Du må legge ved faktura for barnepass for perioden du søker for. Det vil ta lengre tid å få svar fra oss hvis vi må hente inn fra deg i etterkant. Har du ikke enda fått faktura for høsten, anbefaler vi deg å vente med å søke til du har det.',
    },
    dine_plikter_tittel: {
        nb: 'Dine plikter',
    },
    dine_plikter_innhold: {
        nb: [
            'Du må gi oss riktige opplysninger i søknaden.',
            'Du må dokumentere dine utgifter til pass av barn med faktura som inneholder beløp og gjelde for perioden du søker for.',
            'Du må gi beskjed til oss hvis situasjonen din endrer seg.',
            'Hvis du får penger du ikke har rett på, må du du være forberedt på å måtte betale dem tilbake.',
            'Du kan bare søke om støtte til pass av barn, hvis ingen andre har fått dekket utgiftene til pass for samme barn.',
        ],
    },
    utgifter_som_dekkes_tittel: {
        nb: 'Hvilke utgifter dekker vi?',
    },
    //TODO: Fiks med lenke og mellomrom
    utgifter_som_dekkes_innhold: {
        nb: 'Vi dekker 64 prosent av utgiftene du har til pass av barn, opp til en maksimumssats.',
    },
    info_som_hentes_tittel: {
        nb: 'Informasjon vi henter om deg',
    },
    info_som_hentes_innhold1: {
        nb: 'I tillegg til den informasjonen du oppgir i søknaden, henter vi:',
    },
    info_som_hentes_innhold2: {
        nb: [
            'adressen din og opplysninger om dine barn fra Folkeregisteret',
            'om det utbetales kontantstøtte for barnet du søker støtte til pass for',
            'informasjon om aktivitet eller utdanning som er godkjent av NAV',
            'hvis du er arbeidssøker sjekker vi om du sender meldekort',
            'ved behov sjekker vi hvilke andre andre ytelser du mottar fra NAV',
            'ved behov sjekker vi oppholdstillatelse',
        ],
    },
    // TODO: Bare halve skal være lenke
    info_som_hentes_innhold3: {
        nb: 'NAV er ansvarlig for å behandle personopplysningene dine. Vi deler ikke informasjon med noen andre. Slik behandler vi personopplysningene dine',
    },
    dokumentasjon_utgifter_tittel: {
        nb: 'Dette må legges ved søknaden',
    },
    // TODO: Overskrifter + innhold (punktlister)
    dokumentasjon_utgifter_innhold: {
        nb: 'Du må dokumentere utgiftene til barnepass med en faktura som inneholder barnets navn, beløp og periode.',
    },
};
