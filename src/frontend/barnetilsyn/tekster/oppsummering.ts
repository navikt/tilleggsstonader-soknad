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
        ytelse: {
            tittel: TekstElement<string>;
            label: TekstElement<string>;
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
            label: TekstElement<string>;
            endre_button: TekstElement<string>;
        };
    };
}

export const oppsummeringTekster: OppsummeringInnhold = {
    tittel: {
        nb: 'Oppsummering',
    },
    guide_innhold: {
        nb: 'Alt du har fylt inn er nå lagret. Hvis noe er feil kan du gå tilbake og endre det, før du sender inn søknaden din. ',
    },

    bekreft_checkboks: {
        nb: 'Jeg bekrefter at jeg har lest og forstått informasjonen i søknaden og at jeg har svart så godt jeg kan.',
    },

    accordians: {
        aktivitet_utdanning: {
            tittel: {
                nb: 'Aktivitet / utdanning',
            },
            endre_button: {
                nb: 'Endre aktivitet / utdanning',
            },
        },
        barnepass: {
            tittel: {
                nb: 'Pass av barn',
            },
            endre_button: {
                nb: 'Endre barn',
            },
        },
        dine_barn: {
            tittel: {
                nb: 'Dine barn',
            },
            label: {
                nb: 'Barn som skal ha pass',
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
            label: {
                nb: 'Dokumenter du har lagt ved:',
            },
            endre_button: {
                nb: 'Endre vedlegg',
            },
        },
        ytelse: {
            tittel: {
                nb: 'Ytelse',
            },
            label: {
                nb: 'Din situasjon',
            },
            endre_button: {
                nb: 'Endre ytelse',
            },
        },
    },
};
