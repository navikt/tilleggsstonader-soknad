import { TekstElement } from '../../typer/tekst';

interface OppsummeringInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    arbeidsrettet_aktivitet: TekstElement<string>;
    dine_barn: {
        tittel: TekstElement<string>;
        label: TekstElement<string>;
    };
    barnepass: TekstElement<string>;
}

export const oppsummeringTekster: OppsummeringInnhold = {
    tittel: {
        nb: 'Oppsummering',
    },
    guide_innhold: {
        nb: 'Se over søknaden din før du sender den inn. Alt du har fylt inn er lagret. Hvis noe er feil, så kan du gå tilbake og endre det.',
    },
    arbeidsrettet_aktivitet: {
        nb: 'Arbeidsrettet aktivitet',
    },
    dine_barn: {
        tittel: {
            nb: 'Dine barn',
        },
        label: {
            nb: 'Hvilke barn søker du om støtte til pass for?',
        },
    },
    barnepass: {
        nb: 'Pass av barn',
    },
};
