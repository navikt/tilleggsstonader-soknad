import { InlineLenke, LesMer, TekstElement } from '../../typer/tekst';

interface OppsummeringInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    bekreft_checkboks: TekstElement<string>;

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
        aktivitet_utdanning: {
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

    bekreft_checkboks: {
        nb: 'Jeg bekrefter at jeg vil svare så godt jeg kan på spørsmålene i søknaden.',
    },

    accordians: {
        aktivitet_utdanning: {
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
    },
};
