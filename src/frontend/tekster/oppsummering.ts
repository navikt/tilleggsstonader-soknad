import { InlineLenke, LesMer, TekstElement } from '../typer/tekst';

interface OppsummeringInnhold {
    endre_knapp: TekstElement<string>;
    om_deg_tittel: TekstElement<string>;
    om_deg_label_navn: TekstElement<string>;
    om_deg_label_adresse: TekstElement<string>;
    om_deg_lesmer: LesMer<InlineLenke>;
    hovedytelse_tittel: TekstElement<string>;
    arbeid_og_opphold: {
        jobb: TekstElement<string>;
        pengestøtte: TekstElement<string>;
        oppholdSiste12mnd: TekstElement<string>;
        oppholdNeste12mnd: TekstElement<string>;
    };
    vedlegg_tittel: TekstElement<string>;
    ingen_vedlegg: TekstElement<string>;
    bekreft: {
        tittel: TekstElement<string>;
        feil: TekstElement<string>;
    };
}

export const fellesOppsummeringTekster: OppsummeringInnhold = {
    endre_knapp: { nb: 'Endre' },

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

    hovedytelse_tittel: { nb: 'Din situasjon' },
    arbeid_og_opphold: {
        jobb: {
            nb: 'Jobb utenfor Norge',
        },
        pengestøtte: {
            nb: 'Pengestøtte fra annet land enn Norge',
        },
        oppholdSiste12mnd: {
            nb: 'Opphold utenfor Norge siste 12 mnd',
        },
        oppholdNeste12mnd: {
            nb: 'Opphold utenfor Norge neste 12 mnd',
        },
    },
    vedlegg_tittel: { nb: 'Vedlegg' },
    ingen_vedlegg: { nb: 'Ingen vedlegg' },

    bekreft: {
        tittel: {
            nb: 'Jeg bekrefter at jeg har lest og forstått informasjonen i søknaden og svart så godt jeg kan.',
        },
        feil: {
            nb: 'Du må bekrefte for å sende inn søknaden',
        },
    },
};
