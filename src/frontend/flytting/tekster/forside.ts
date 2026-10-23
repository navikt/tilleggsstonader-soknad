import { TekstElement } from '../../typer/tekst';

interface ForsideInnhold {
    banner_tittel: TekstElement<string>;
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
}

export const forsideTekster: ForsideInnhold = {
    banner_tittel: {
        nb: 'Søknad om støtte ved flytting',
    },
    veileder_tittel: {
        nb: 'Hei [0]!',
    },
    veileder_innhold: {
        nb: ['Søknadsskjemaet er under utvikling.'],
    },
};
