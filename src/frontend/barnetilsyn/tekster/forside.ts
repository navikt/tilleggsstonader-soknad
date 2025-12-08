import { InlineLenke, Punktliste, TekstElement } from '../../typer/tekst';

interface ForsideInnhold {
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
    mottatt_faktura_alert_tittel: TekstElement<string>;
    mottatt_faktura_alert_innhold: TekstElement<string[]>;
    viktig_å_vite_tittel: TekstElement<string>;
    viktig_å_vite_innhold: TekstElement<string[]>;
    utgifter_som_dekkes_tittel: TekstElement<string>;
    utgifter_som_dekkes_innhold: TekstElement<string[]>;
    info_som_hentes_tittel: TekstElement<string>;
    info_som_hentes_punktlister: Punktliste[];
    info_som_hentes_personvern: TekstElement<InlineLenke>;
    dokumentasjon_utgifter_tittel: TekstElement<string>;
    dokumentasjon_utgifter_punktlister: Punktliste[];
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
    viktig_å_vite_tittel: {
        nb: 'Viktig å vite før du søker',
    },
    viktig_å_vite_innhold: {
        nb: [
            'Du må dokumentere utgiftene dine i søknaden.',
            'Du må gi beskjed til oss hvis situasjonen din endrer seg.',
            'Hvis den andre forelderen har søkt om eller mottar stønad til pass av barn, har du ikke rett til samme stønad. Nav gir kun stønad til én forelder.',
            'Hvis du får penger du ikke har rett på, kan vi kreve at du betaler de tilbake.',
            'De fleste feltene i skjemaet er obligatoriske å fylle ut. Felt som ikke er obligatoriske er merket med: (valgfritt).',
        ],
    },
    utgifter_som_dekkes_tittel: {
        nb: 'Hvilke utgifter dekker vi?',
    },
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
    info_som_hentes_punktlister: [
        {
            tittel: {
                nb: 'I tillegg til den informasjonen du oppgir i søknaden, henter vi:',
            },
            innhold: {
                nb: [
                    'adressen din og opplysninger om dine barn fra Folkeregisteret',
                    'informasjon om arbeidsrettet aktivitet',
                    'hvilke andre andre ytelser du mottar fra Nav',
                ],
            },
        },
        {
            tittel: {
                nb: 'Ved behov sjekker vi:',
            },
            innhold: {
                nb: [
                    'om du har barn det utbetales kontantstøtte for',
                    'om du sender meldekort',
                    'om du er medlem i folketrygden',
                ],
            },
        },
    ],
    info_som_hentes_personvern: {
        nb: [
            'Nav er ansvarlig for å behandle personopplysningene dine. Vi deler ikke informasjonen du gir oss i søknaden med noen andre.  ',
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
    dokumentasjon_utgifter_punktlister: [
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
