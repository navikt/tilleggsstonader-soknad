import { InlineLenke, Punktliste, TekstElement } from '../../typer/tekst';

interface ForsideInnhold {
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
    mottatt_faktura_alert_tittel: TekstElement<string>;
    mottatt_faktura_alert_innhold: TekstElement<string[]>;
    dine_plikter_tittel: TekstElement<string>;
    dine_plikter_innhold: TekstElement<string[]>;
    utgifter_som_dekkes_tittel: TekstElement<string>;
    utgifter_som_dekkes_innhold: TekstElement<string[]>;
    info_som_hentes_tittel: TekstElement<string>;
    info_som_hentes_innhold1: TekstElement<string>;
    info_som_hentes_innhold2: TekstElement<string[]>;
    info_som_hentes_innhold3: TekstElement<string>;
    info_som_hentes_innhold4: TekstElement<string[]>;
    info_som_hentes_innhold5: TekstElement<InlineLenke>;
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
        ],
    },
    mottatt_faktura_alert_tittel: {
        nb: 'Skal du søke for nytt skole/barnehageår?',
    },
    mottatt_faktura_alert_innhold: {
        nb: [
            'Du må legge ved faktura for perioden du søker for. Det vil ta lengre tid å få svar fra oss hvis vi må hente inn fra deg i etterkant.',
            'Hvis du ikke har mottatt fakturaen ennå, anbefaler vi at du venter med å søke til du får den.',
        ],
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
            'Som hovedregel gis det bare støtte til pass av barn til og med 4.-klasse.',
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
            'informasjon om arbeidsrettet aktivitet',
            'hvilke andre andre ytelser du mottar fra NAV',
        ],
    },
    info_som_hentes_innhold3: {
        nb: 'Ved behov sjekker vi:',
    },
    info_som_hentes_innhold4: {
        nb: [
            'om du har barn det utbetales kontantstøtte for',
            'om du sender meldekort',
            'om du er medlem i folketrygden',
        ],
    },
    info_som_hentes_innhold5: {
        nb: [
            'NAV er ansvarlig for å behandle personopplysningene dine. Vi deler ikke informasjonen du gir oss i søknaden med noen andre.  ',
            {
                tekst: 'Personvernerklæringen på nav.no (åpnes i ny fane)',
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
