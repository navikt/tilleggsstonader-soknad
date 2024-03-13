import { InlineLenke, Punktliste, TekstElement } from '../../typer/tekst';

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
    info_som_hentes_innhold3: TekstElement<InlineLenke>;
    dokumentasjon_utgifter_tittel: TekstElement<string>;
    dokumentasjon_utgifter_innhold: Punktliste[];
}

export const forsideTekster: ForsideInnhold = {
    veileder_tittel: {
        nb: 'Hei [0]!',
    },
    veileder_innhold: {
        nb: [
            'Denne pengestøtten kan gis til deg som gjennomfører en arbeidsrettet aktivitet og er enslig mor/far, gjenlevende, mottar AAP, uføretrygd eller har nedsatt arbeidsevne.',
            'Svarene dine lagres underveis, slik at du kan gå tilbake og endre dem. Vi lagrer påbegynte søknad i én uke på Min side.',
        ],
    },
    mottatt_faktura_alert_tittel: {
        nb: 'Skal du søke for nytt skole/barnehageår?',
    },
    mottatt_faktura_alert_innhold: {
        nb: 'Du må legge ved faktura for barnepass for perioden du søker for. Det vil ta lengre tid å få svar fra oss hvis vi må hente inn fra deg i etterkant. Har du ikke enda fått faktura for høsten, anbefaler vi deg å vente med å søke til du har det.',
    },
    dine_plikter_tittel: {
        nb: 'Viktig å vite før du søker',
    },
    dine_plikter_innhold: {
        nb: [
            'Du må gi oss riktige opplysninger i søknaden.',
            'Du må dokumentere utgiftene dine i søknaden.',
            'Du må gi beskjed til oss hvis situasjonen din endrer seg.',
            'Hvis du får penger du ikke har rett på, kan vi kreve at du betaler de tilbake.',
        ],
    },
    utgifter_som_dekkes_tittel: {
        nb: 'Hvilke utgifter dekker vi?',
    },
    //TODO: Fiks med lenke og mellomrom
    utgifter_som_dekkes_innhold: {
        nb: [
            'Vi dekker opp til 64 prosent av utgiftene du har til pass av barn.',
            'Utgifter til mat og bleier dekkes ikke.',
            'Som hovedregel gis det bare støtte til pass av barn til og med 4. klasse.',
        ],
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
    info_som_hentes_innhold3: {
        nb: [
            'NAV er ansvarlig for å behandle personopplysningene dine. Vi deler ikke informasjonen du gir oss i søknaden med noen andre.  ',
            {
                tekst: 'Personvernerklæringen på nav.no',
                url: 'https://www.nav.no/personvernerklaering',
                variant: 'neutral',
            },
            ' gir mer informasjon om hvordan vi behandler dine personopplysninger.',
        ],
    },
    dokumentasjon_utgifter_tittel: {
        nb: 'Dokumentasjon av utgifter',
    },
    dokumentasjon_utgifter_innhold: [
        {
            tittel: {
                nb: 'For barn i barnehage, SFO eller AKS legger du ved faktura som inneholder:',
            },
            innhold: {
                nb: [
                    'barnets navn',
                    'hva som er utgifter til pass, mat og eventuelt bleier',
                    'perioden utgiftene gjelder for',
                ],
            },
        },
        {
            tittel: {
                nb: 'Har du privat pass som f.eks. dagmamma eller praktikant legger du ved:',
            },
            innhold: {
                nb: [
                    'avtale med barnepasser',
                    'kvittering for betaling',
                    'eventuelt A-melding sendt Skatteetaten',
                ],
            },
        },
    ],
};
