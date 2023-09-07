import { TekstElement } from '../../typer/tekst';

interface OppsummeringInnhold {
    steg_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    bekreft_checkboks: TekstElement<string>;

    accordians: {
        om_deg: {
            tittel: TekstElement<string>;
        };
        ytelse: {
            tittel: TekstElement<string>;
            label: TekstElement<string>;
        };
        aktivitet_utdanning: {
            tittel: TekstElement<string>;
        };
        dine_barn: {
            tittel: TekstElement<string>;
            label: TekstElement<string>;
        };
        barnepass: {
            tittel: TekstElement<string>;
        };
        vedlegg: {
            tittel: TekstElement<string>;
            label: TekstElement<string>;
        };
    };
}

export const oppsummeringTekster: OppsummeringInnhold = {
    steg_tittel: {
        nb: 'Oppsummering',
    },
    guide_innhold: {
        nb: 'Alt du har fyllt inn er nå lagret. Her kan du se over at alt er riktig. Hvis noe er feil, kan du gå tilbake og endre opplysninger, før du sender inn søknaden din. ',
    },

    bekreft_checkboks: {
        nb: 'Jeg bekrefter at jeg har lest og forstått informasjonen i søknaden og svarer så godt jeg kan.',
    },

    accordians: {
        aktivitet_utdanning: {
            tittel: {
                nb: 'Aktivitet / utdanning',
            },
        },
        barnepass: {
            tittel: {
                nb: 'Pass av barn',
            },
        },
        dine_barn: {
            tittel: {
                nb: 'Dine barn',
            },
            label: {
                nb: 'Barn som skal ha pass',
            },
        },
        om_deg: {
            tittel: {
                nb: 'Om deg',
            },
        },
        vedlegg: {
            tittel: {
                nb: 'Vedlegg',
            },
            label: {
                nb: 'Dokumenter du har lagt ved:',
            },
        },
        ytelse: {
            tittel: {
                nb: 'Ytelse',
            },
            label: {
                nb: 'Din situasjon',
            },
        },
    },
};
