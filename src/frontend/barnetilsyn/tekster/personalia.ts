import { TekstElement } from '../../typer/tekst';

interface PersonaliaInnhold {
    steg_tittel: TekstElement<string>;
    innhold_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
}

export const personaliaTekster: PersonaliaInnhold = {
    steg_tittel: {
        nb: 'Om deg',
    },
    innhold_tittel: {
        nb: 'Vi har registrert dette om deg',
    },
    guide_innhold: {
        nb: 'Det er lurt å sjekke om alt er riktig her så du får svar fra oss i tide og eventuelle utbetalinger kommer til rett konto.',
    },
};
