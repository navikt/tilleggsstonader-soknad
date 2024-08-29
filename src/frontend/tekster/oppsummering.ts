import { InlineLenke, LesMer, TekstElement } from '../typer/tekst';

interface OppsummeringInnhold {
    om_deg_tittel: TekstElement<string>;
    om_deg_label_navn: TekstElement<string>;
    om_deg_label_adresse: TekstElement<string>;
    om_deg_lesmer: LesMer<InlineLenke>;
}

export const oppsummeringTekster: OppsummeringInnhold = {
    om_deg_tittel: { nb: 'Om deg' },
    om_deg_label_navn: { nb: 'Navn' },
    om_deg_label_adresse: { nb: 'Adresse' },
    om_deg_lesmer: {
        header: { nb: 'Slik endrer du folkeregistrert adresse' },
        innhold: {
            nb: [
                'Vi henter adressen din fra folkeregisteret. Er noe feil, må du ',
                {
                    tekst: 'melde adresseendring på Skattetatens sider.',
                    url: 'https://www.skatteetaten.no/person/folkeregister/flytte/endre-postadresse/',
                },
            ],
        },
    },
};
