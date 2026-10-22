import { TekstElement } from '../../typer/tekst';

interface EndringEnsligForsørgerInnhold {
    tittel: TekstElement<string>;
    innhold: TekstElement<string>;
    sporsmal_tittel: TekstElement<string>;
    sporsmal_innhold: TekstElement<string>;
}

export const endringEnsligForsørgerTekster: EndringEnsligForsørgerInnhold = {
    tittel: {
        nb: 'Fra 1. juli 2026 er reglene for enslig mor eller far endret',
    },
    innhold: {
        nb: 'Du kan fortsatt få tilleggsstønader hvis du har rett til overgangsstønad etter reglene som gjaldt før 1. juli 2026, eller etter overgangsreglene. Hvis du har rett til overgangsstønad etter de nye reglene som gjelder fra 1. juli 2026, har du ikke rett til tilleggsstønader.',
    },
    sporsmal_tittel: {
        nb: 'Kan jeg få tilleggsstønader?',
    },
    sporsmal_innhold: {
        nb: 'Hvis du har rett til overgangsstønad etter de gamle reglene eller etter overgangsreglene, kan du ha rett til tilleggsstønader. Hvis du har rett til overgangsstønad etter de nye reglene som gjelder fra 1. juli 2026, har du ikke rett til tilleggsstønader.',
    },
};
