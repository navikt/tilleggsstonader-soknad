import { TekstElement } from '../../typer/tekst';
interface BarnepassInnhold {
    steg_tittel: TekstElement<string>;
}

export const barnepassTekster: BarnepassInnhold = {
    steg_tittel: {
        nb: 'Om pass av barn',
    },
};
