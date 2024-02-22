import { InlineLenke, LesMer, TekstElement } from '../../typer/tekst';

interface PersonaliaInnhold {
    steg_tittel: TekstElement<string>;
    innhold_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    adresse_label: TekstElement<string>;
    adresse_lesmer: LesMer<InlineLenke>;
    telefonnr_label: TekstElement<string>;
    epost_label: TekstElement<string>;
    tlf_epost_lesmer: LesMer<InlineLenke>;
    kontonr_label: TekstElement<string>;
    kontonr_lesmer: LesMer<InlineLenke>;
}

export const personaliaTekster: PersonaliaInnhold = {
    steg_tittel: {
        nb: 'Om deg',
    },
    innhold_tittel: {
        nb: 'Denne informasjonen om deg er registrert hos oss',
    },
    guide_innhold: {
        nb: 'Sjekk gjerne om alt er riktig her, så du får svar fra oss i tide og eventuelle utbetalinger kommer til rett konto.',
    },
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
    telefonnr_label: { nb: 'Telefonnummer' },
    epost_label: { nb: 'E-post adresse' },
    tlf_epost_lesmer: {
        header: { nb: 'Slik endrer du e-post eller telefonnummer' },
        innhold: {
            nb: [
                'Telefonnummer og e-postadressen er hentet fra ',
                {
                    tekst: 'Kontakt- og reservasjonsregisteret (KRR).',
                    url: 'https://www.skatteetaten.no/person/folkeregister/flytte/endre-postadresse/',
                },
            ],
        },
    },
    kontonr_label: { nb: 'Kontonummer' },
    kontonr_lesmer: {
        header: { nb: 'Slik endrer du kontonummer' },
        innhold: {
            nb: [
                'Er kontonummeret feil, kan du endre det selv på ',
                {
                    tekst: 'Min side på Nav under "Personopplysninger".',
                    url: 'https://www.nav.no/min-side',
                },
            ],
        },
    },
};
