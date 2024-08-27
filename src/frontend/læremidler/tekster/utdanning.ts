import { Radiogruppe, TekstElement } from '../../typer/tekst';
import { AnnenUtdanningType } from '../typer/søknad';

interface AktivitetInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
    radio_annen_utdanning: Radiogruppe<AnnenUtdanningType>;
    radio_annen_utdanning_feilmelding: TekstElement<string>;
}

const AnnenUtdanningTypeTilTekst: Record<AnnenUtdanningType, TekstElement<string>> = {
    VIDEREGÅENDE_FORKURS: { nb: 'Videregående utdanning, eller forkurs på universitett' },
    FAGSKOLE_HØGSKOLE_UNIVERSITET: {
        nb: 'Utdanning på fagskole, høgskole eller universitet',
    },
    KURS_LIKNENDE: {
        nb: 'Kurs eller lignende',
    },
    INGEN_UTDANNING: {
        nb: 'Jeg skal ikke ta utdanning eller opplæring',
    },
};

export const utdanningTekster: AktivitetInnhold = {
    tittel: { nb: 'Utdanning eller opplæring' },
    guide_innhold: {
        nb: [
            'For å få støtte til læremidler må du ta en utdannelse eller opplæring godkjent av NAV.',
            'Vi viser utdanninger registrert på deg de siste 6 månedene.',
        ],
    },
    radio_annen_utdanning: {
        header: {
            nb: 'Hva slags utdanning eller opplæring skal du ta?',
        },
        beskrivelse: {
            nb: 'Utdanningen må godkjennes og avtales med veileder.',
        },
        alternativer: AnnenUtdanningTypeTilTekst,
    },
    radio_annen_utdanning_feilmelding: {
        nb: 'Du må svare på hvilken utdanning du søker om støtte i forbindelse med.',
    },
};
