import { InlineLenke, LesMer, TekstElement } from '../../typer/tekst';

interface OppsummeringInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;

    accordians: {
        om_deg: {
            tittel: TekstElement<string>;
            navn_label: TekstElement<string>;
            adresse_label: TekstElement<string>;
            adresse_lesmer: LesMer<InlineLenke>;
        };
        din_situasjon: {
            tittel: TekstElement<string>;
            endre_button: TekstElement<string>;
        };
        arbeid_og_opphold: {
            jobb: TekstElement<string>;
            pengestøtte: TekstElement<string>;
            oppholdSiste12mnd: TekstElement<string>;
            oppholdNeste12mnd: TekstElement<string>;
        };
        arbeidsrettet_aktivitet: {
            tittel: TekstElement<string>;
            endre_button: TekstElement<string>;
        };
        dine_barn: {
            tittel: TekstElement<string>;
            label: TekstElement<string>;
            endre_button: TekstElement<string>;
        };
        barnepass: {
            tittel: TekstElement<string>;
            endre_button: TekstElement<string>;
        };
        vedlegg: {
            tittel: TekstElement<string>;
            endre_button: TekstElement<string>;
        };
    };
}

export const oppsummeringTekster: OppsummeringInnhold = {
    tittel: {
        nb: 'Oppsummering',
    },
    guide_innhold: {
        nb: 'Se over søknaden din før du sender den inn. Alt du har fylt inn er lagret. Hvis noe er feil, så kan du gå tilbake og endre det.',
    },

    accordians: {
        arbeidsrettet_aktivitet: {
            tittel: {
                nb: 'Arbeidsrettet aktivitet',
            },
            endre_button: {
                nb: 'Endre aktivitet',
            },
        },
        barnepass: {
            tittel: {
                nb: 'Pass av barn',
            },
            endre_button: {
                nb: 'Endre pass',
            },
        },
        dine_barn: {
            tittel: {
                nb: 'Dine barn',
            },
            label: {
                nb: 'Hvilke barn søker du om støtte til pass for?',
            },
            endre_button: {
                nb: 'Endre barn',
            },
        },
        om_deg: {
            tittel: {
                nb: 'Om deg',
            },
            navn_label: { nb: 'Navn' },
            adresse_label: { nb: 'Folkeregistrert adresse' },
            adresse_lesmer: {
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
        },
        vedlegg: {
            tittel: {
                nb: 'Vedlegg',
            },
            endre_button: {
                nb: 'Endre vedlegg',
            },
        },
        din_situasjon: {
            tittel: {
                nb: 'Din situasjon',
            },
            endre_button: {
                nb: 'Endre ytelse',
            },
        },
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
    },
};
