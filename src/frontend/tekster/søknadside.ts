import { InlineLenke, TekstElement } from '../typer/tekst';

interface søknadsideInnhold {
    spørsmål1: TekstElement<string>;
    spørsmål1_innhold: TekstElement<InlineLenke>;
    spørsmål2: TekstElement<string>;
    spørsmål2_innhold: TekstElement<string>;
    alertForBarnetilsyn: TekstElement<string>;
    alertForLæremidler: TekstElement<string>;
    alert_innhold: TekstElement<InlineLenke>;
    minside: TekstElement<InlineLenke>;
}

export const søknadsideTekster: søknadsideInnhold = {
    spørsmål1: {
        nb: 'Spørsmål om søknaden eller saksbehandlingstid?',
    },

    spørsmål1_innhold: {
        nb: [
            'Du kan se forventet saksbehandlingstid på ',
            {
                tekst: ' nav.no/saksbehandlingstid',
                url: 'https://www.nav.no/saksbehandlingstid',
            },
        ],
    },
    spørsmål2: {
        nb: 'Vil du likevel sende ny søknad?',
    },
    spørsmål2_innhold: {
        nb: 'Hvis du har begynt på en ny utdanning eller opplæring, kan du sende ny søknad. ',
    },
    alertForBarnetilsyn: {
        nb: 'Du har allerede sendt oss en søknad om støtte til pass av barn. ',
    },
    alertForLæremidler: {
        nb: 'Du har allerede sendt oss en søknad om støtte til læremidler. ',
    },
    alert_innhold: {
        nb: [
            'Søknaden venter på behandling hos oss. Du kan se søknaden på ',
            {
                tekst: ' Min side',
                url: 'https://www.nav.no/min-side',
            },
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
};
