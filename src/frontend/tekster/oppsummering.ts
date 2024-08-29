import { TekstElement } from '../typer/tekst';

interface OppsummeringInnhold {
    om_deg_tittel: TekstElement<string>;
    om_deg_label_navn: TekstElement<string>;
    om_deg_label_adresse: TekstElement<string>;
}

export const oppsummeringTekster: OppsummeringInnhold = {
    om_deg_tittel: { nb: 'Om deg' },
    om_deg_label_navn: { nb: 'Navn' },
    om_deg_label_adresse: { nb: 'Adresse' },
};
