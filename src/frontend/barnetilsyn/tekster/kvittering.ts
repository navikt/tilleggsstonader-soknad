import { InlineLenke, TekstElement } from '../../typer/tekst';

interface KvitteringInnhold {
    tittel: TekstElement<string>;
    søknad_mottatt_alert_tittel: TekstElement<string>;
    søknad_mottatt_alert_innhold1: TekstElement<string>;
    søknad_mottatt_alert_innhold2: TekstElement<string>;
    varsel_info: TekstElement<string>;
    se_søknad: TekstElement<InlineLenke>;
    se_saksbehandlingstid: TekstElement<InlineLenke>;
}

export const kvitteringTekster: KvitteringInnhold = {
    tittel: {
        nb: 'Kvittering',
    },
    søknad_mottatt_alert_tittel: { nb: 'Søknad mottatt' },
    søknad_mottatt_alert_innhold1: {
        nb: 'Vi har mottatt søknaden din om støtte til pass av barn [0].',
    },
    søknad_mottatt_alert_innhold2: {
        nb: 'Vi vil ta kontakt med deg på telefon eller via Min side hvis vi trenger mer informasjon eller dokumentasjon fra deg.',
    },
    varsel_info: {
        nb: 'Du får varsel på SMS eller e-post når saken er ferdig behandlet.',
    },
    se_søknad: {
        nb: [
            'Du kan se søknaden din på ',
            {
                tekst: 'Min side på nav.no',
                url: 'https://www.nav.no/min-side',
            },
            ' (åpnes i ny fane).',
        ],
    },
    se_saksbehandlingstid: {
        nb: [
            'Du kan se ',
            {
                tekst: 'forventet saksbehandlingstid på nav.no/saksbehandlingstid',
                url: 'https://www.nav.no/saksbehandlingstider#tilleggsstonader',
            },
            ' (åpnes i ny fane).',
        ],
    },
};
