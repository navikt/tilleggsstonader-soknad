import { TekstElement } from '../../typer/tekst';

interface KvitteringInnhold {
    steg_tittel: TekstElement<string>;
    søknad_mottatt_alert_tittel: TekstElement<string>;
    søknad_mottatt_alert_innhold: TekstElement<string[]>;
}

export const kvitteringTekster: KvitteringInnhold = {
    steg_tittel: {
        nb: 'Kvittering',
    },
    søknad_mottatt_alert_tittel: { nb: 'Søknad mottatt' },
    søknad_mottatt_alert_innhold: {
        nb: [
            'Vi har mottatt søknaden din om støtte til pass av barn. Saken din er nå til behandling hos NAV.',
            'Vi vil ta kontakt med deg på telefon eller via Mitt NAV hvis vi trenger mer informasjon eller dokumentasjon fra deg.',
        ],
    },
};
