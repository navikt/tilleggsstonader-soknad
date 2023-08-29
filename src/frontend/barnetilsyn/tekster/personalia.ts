import { LesMer, TekstElement } from '../../typer/tekst';

interface PersonaliaInnhold {
    steg_tittel: TekstElement<string>;
    innhold_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    adresse_label: TekstElement<string>;
    adresse_lesmer: TekstElement<LesMer>;
    telefonnr_label: TekstElement<string>;
    epost_label: TekstElement<string>;
    tlf_epost_lesmer: TekstElement<LesMer>;
    kontonr_label: TekstElement<string>;
    kontonr_lesmer: TekstElement<LesMer>;
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
    adresse_label: { nb: 'Folkeregistrert adresse' },
    adresse_lesmer: {
        nb: { header: 'Slik endrer du folkeregistrert adresse', innhold: 'Innhold mangler' },
    },
    telefonnr_label: { nb: 'Telefonnummer' },
    epost_label: { nb: 'E-post adresse' },
    tlf_epost_lesmer: {
        nb: { header: 'Slik endrer du e-post eller telefonnummer', innhold: 'Innhold mangler' },
    },
    kontonr_label: { nb: 'Kontonummer' },
    kontonr_lesmer: {
        nb: { header: 'Slik endrer du kontonummer', innhold: 'Innhold mangler' },
    },
};
