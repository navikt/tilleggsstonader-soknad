import { InlineLenke, Punktliste, TekstElement } from '../../typer/tekst';

interface ForsideInnhold {
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
    mottatt_faktura_alert_tittel: TekstElement<string>;
    mottatt_faktura_alert_innhold: TekstElement<string>;
    dine_plikter_tittel: TekstElement<string>;
    dine_plikter_innhold: TekstElement<string[]>;
    utgifter_som_dekkes_tittel: TekstElement<string>;
    utgifter_som_dekkes_innhold_1: TekstElement<InlineLenke>;
    utgifter_som_dekkes_innhold_2: TekstElement<string>;
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
        nb: 'Viktig å vite før du søker',
    },
    dine_plikter_innhold: {
        nb: [
            'Du må gi oss riktige opplysninger i søknaden.',
            'Du må dokumentere dine utgifter til pass av barn med faktura som inneholder beløp og gjelde for perioden du søker for.',
            'Du må gi beskjed til oss hvis situasjonen din endrer seg.',
            'Hvis du får penger du ikke har rett på, kan vi kreve at du betaler dem tilbake.',
            'Du kan bare søke om støtte til pass av barn, hvis ingen andre har fått dekket utgiftene til pass for samme barn.',
        ],
    },
    utgifter_som_dekkes_tittel: {
        nb: 'Hvilke utgifter dekker vi?',
    },
    //TODO: Fiks med lenke og mellomrom
    utgifter_som_dekkes_innhold_1: {
        nb: [
            'Vi dekker 64 prosent av utgiftene du har til pass av barn, opp til en ',
            {
                tekst: 'maksimumssats.',
                url: 'https://www.nav.no/tilleggsstonader#hva',
                variant: 'neutral',
            },
        ],
    },
    utgifter_som_dekkes_innhold_2: {
        nb: 'Utgifter til mat og bleier dekkes ikke.  ',
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
        nb: 'Dette må legges ved søknaden',
    },
    dokumentasjon_utgifter_innhold: [
        {
            tittel: {
                nb: 'For barn i barnehage, SFO eller AKS legger du ved faktura som inneholder:',
            },
            innhold: {
                nb: [
                    'Barnets navn',
                    'Hva som er utgifter til pass, mat og eventuelt bleier.',
                    'Perioden utgiftene gjelder for. ',
                ],
            },
        },
        {
            tittel: {
                nb: 'Benyttes privat pass som f.eks. dagmamma eller praktikant:',
            },
            innhold: {
                nb: [
                    'Dokumentere dine utgifter med f.eks. avtale med barnepasser og/eller A-melding sendt skatteetaten',
                ],
            },
        },
        {
            tittel: {
                nb: 'For barn som er ferdig med 4. skoleår må du dokumentere:',
            },
            innhold: {
                nb: [
                    'at barnet har større behov for pass enn jevnaldrende, med skriftlig uttalelse fra lege, spesialist eller annet helsepersonell, eller',
                    'at du har en arbeidsrettet aktivitet hvor du må være borte på andre tider enn en vanlig arbeidsdag, med dokumentasjon fra utdanning/tiltakssted.',
                ],
            },
        },
    ],
};
