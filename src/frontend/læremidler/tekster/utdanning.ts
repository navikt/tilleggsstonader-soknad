import { TekstElement } from '../../typer/tekst';

interface AktivitetInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
}

export const utdanningTekster: AktivitetInnhold = {
    tittel: { nb: 'Utdanning eller opplæring' },
    guide_innhold: {
        nb: [
            'For å få støtte til læremidler må du ta en utdannelse eller opplæring godkjent av NAV.',
            'Vi viser utdanninger registrert på deg de siste 6 månedene.',
        ],
    },
};
