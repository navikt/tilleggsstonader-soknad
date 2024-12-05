import { InlineLenke, TekstElement } from '../typer/tekst';

interface søknadsideInnhold {
    spørsmål_om_søknaden: TekstElement<string>;
    spørsmål_om_søknaden_innhold: TekstElement<InlineLenke>;
    vil_forstatt_sende_søknad: TekstElement<string>;
    vil_forstatt_sende_søknad_innhold: TekstElement<string>;
    alert_for_stønadstype: TekstElement<string>;
    alert_innhold: TekstElement<InlineLenke>;
    minside: TekstElement<InlineLenke>;
    startNySøknad: TekstElement<string>;
}

export const harEksisterendeBehandlingTekster: søknadsideInnhold = {
    spørsmål_om_søknaden: {
        nb: 'Spørsmål om søknaden eller saksbehandlingstid?',
    },

    spørsmål_om_søknaden_innhold: {
        nb: [
            'Du kan se forventet saksbehandlingstid på ',
            {
                tekst: ' nav.no/saksbehandlingstid',
                url: 'https://www.nav.no/saksbehandlingstid',
            },
            ' (åpnes i nytt vindu).',
        ],
    },
    vil_forstatt_sende_søknad: {
        nb: 'Vil du likevel sende ny søknad?',
    },
    vil_forstatt_sende_søknad_innhold: {
        nb: 'Hvis du har begynt på nytt tiltak, ny utdanning eller det er ett nytt skole/barnehageår kan du sende ny søknad.',
    },
    alert_for_stønadstype: {
        nb: 'Du har allerede sendt oss en søknad om støtte til [0]. ',
    },
    alert_innhold: {
        nb: [
            'Søknaden venter på behandling hos oss. Du kan se søknaden på ',
            {
                tekst: ' Min side',
                url: 'https://www.nav.no/min-side',
            },
            ' (åpnes i ny fane) ',
        ],
    },
    minside: {
        nb: [
            {
                tekst: ' Gå til Min Side',
                url: 'https://www.nav.no/saksbehandlingstid',
            },
        ],
    },
    startNySøknad: {
        nb: 'Start ny søknad',
    },
};
