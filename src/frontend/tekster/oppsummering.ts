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
}

export const fellesOppsummeringTekster: OppsummeringInnhold = {
    endre_knapp: { nb: 'Endre' },

    om_deg_tittel: { nb: 'Om deg' },
    om_deg_label_navn: { nb: 'Navn' },
    om_deg_label_adresse: { nb: 'Adresse' },
    om_deg_lesmer: {
        header: { nb: 'Hva gjør jeg hvis adressen er feil' },
        innhold: {
            nb: [
                'Hvis adressen er feil, må du ',
                {
                    tekst: 'melde fra til folkeregisteret',
                    url: 'https://www.skatteetaten.no/person/folkeregister/flytte/endre-postadresse/',
                },
                ' (åpnes i ny fane). Du trenger ikke gjøre det før du sender inn søknaden.',
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
};
