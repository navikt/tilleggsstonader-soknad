import { InlineLenke, TekstElement } from '../typer/tekst';

interface KvitteringInnhold {
    tittel: TekstElement<string>;
    søknad_innsendt_alert: TekstElement<string>;
    søknad_mottatt_tidspunkt: TekstElement<string>;
    mer_info_kontakt: TekstElement<string>;
    varsel_info: TekstElement<string>;

    se_søknad_knapp: TekstElement<string>;

    behandlingstid_tittel: TekstElement<string>;
    behandlingstid_innhold: TekstElement<InlineLenke>;

    kontakt_oss_tittel: TekstElement<string>;
    kontakt_oss_innhold: TekstElement<InlineLenke>;

    vilkår_tittel: TekstElement<string>;
    vilkår_innhold: TekstElement<InlineLenke>;

    relevante_stønader_tittel: TekstElement<string>;
    relevante_stønader_innhold: TekstElement<InlineLenke>;
}

export const kvitteringTekster: KvitteringInnhold = {
    tittel: {
        nb: 'Kvittering',
    },
    søknad_innsendt_alert: { nb: 'Søknaden din er sendt' },
    søknad_mottatt_tidspunkt: {
        nb: 'Mottatt av Nav: [0].',
    },
    mer_info_kontakt: {
        nb: 'Vi vil ta kontakt med deg på telefon eller via Min side på nav.no hvis vi trenger mer informasjon eller dokumentasjon fra deg.',
    },
    varsel_info: {
        nb: 'Du får varsel på SMS eller e-post når saken er ferdig behandlet.',
    },
    se_søknad_knapp: {
        nb: 'Du søknaden din på min side ',
    },
    behandlingstid_tittel: { nb: 'Forventet behandlingstid' },
    behandlingstid_innhold: {
        nb: [
            'Vi gjør vårt beste for å behandle søknaden din så snart som mulig. ',
            {
                tekst: 'Se forventet saksbehandlingstid',
                url: 'https://www.nav.no/saksbehandlingstider#tilleggsstonader',
            },
            '.',
        ],
    },
    kontakt_oss_tittel: { nb: 'Kontakt oss' },
    kontakt_oss_innhold: {
        nb: [
            'Kontakt oss på ',
            {
                tekst: 'nav.no/kontaktoss',
                url: 'https://www.nav.no/kontaktoss',
            },
            ' eller på telefon 55 55 33 33 hvis du har spørsmål eller vil melde fra om endringer eller feil.',
        ],
    },
    vilkår_tittel: { nb: 'Vilkår og betingelser' },
    vilkår_innhold: {
        nb: [
            'Hvis du ønsker informasjon om hvordan vi behandler søknaden din eller informasjon om vilkårene for støtte til læremidler, kan du ',
            {
                tekst: 'lese om det her',
                url: 'https://www.nav.no/tilleggsstonader#stotte',
            },
            '.',
        ],
    },
    relevante_stønader_tittel: { nb: 'Du kan også ha rett til' },
    relevante_stønader_innhold: {
        nb: [
            'Når du gjennomfører en utdanning eller opplæring godkjent av Nav, kan det hende du også har rett til andre tilleggsstønader. ',
            {
                tekst: 'Les mer om det her',
                url: 'https://www.nav.no/tilleggsstonader',
            },
            '.',
        ],
    },
};
