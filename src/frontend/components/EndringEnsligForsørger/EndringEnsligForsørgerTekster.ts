import { TekstElement } from '../../typer/tekst';

interface EndringEnsligForsørgerInnhold {
    tittel: TekstElement<string>;
    sporsmal_tittel: TekstElement<string>;
    sporsmal_innhold: TekstElement<string>;
}

export const endringEnsligForsørgerTekster: EndringEnsligForsørgerInnhold = {
    tittel: {
        nb: 'Fra 1. juli 2026 er reglene for enslig mor eller far endret',
    },
    sporsmal_tittel: {
        nb: 'Kan jeg få tilleggsstønader?',
    },
    sporsmal_innhold: {
        nb: 'Fra 1. juli 2026 ble reglene for overgangsstønad til enslig mor eller far endret. Du kan bare få tilleggsstønader dersom du har rett til overgangsstønad etter reglene som gjaldt før 1. juli 2026, eller etter overgangsreglene. Har du rett til overgangsstønad etter de nye reglene som gjelder fra 1. juli 2026, har du ikke rett til tilleggsstønader.',
    },
};
