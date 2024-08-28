import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';
import { AnnenUtdanningType } from '../typer/søknad';

interface AktivitetInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
    radio_annen_utdanning: Radiogruppe<AnnenUtdanningType>;
    radio_annen_utdanning_feilmelding: TekstElement<string>;
    ingen_utdanning_alert_tittel: TekstElement<string>;
    ingen_utdanning_alert_innhold: TekstElement<string>;
    radio_mottar_utstyrsstipend: Radiogruppe<JaNei>;
    radio_mottar_utstyrsstipend_feilmelding: TekstElement<string>;
    radio_mottar_har_funksjonsnedsettelse: Radiogruppe<JaNei>;
    radio_mottar_har_funksjonsnedsettelse_feilmelding: TekstElement<string>;
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
    ingen_utdanning_alert_tittel: {
        nb: 'Hvis du ikke gjennomfører utdanning, har du ikke rett til støtte til læremidler',
    },
    ingen_utdanning_alert_innhold: {
        nb: 'Du kan fortsatt søke, men du kan få avslag.',
    },
    radio_mottar_utstyrsstipend: {
        header: {
            nb: 'Mottar du utstyrsstipend fra Statens lånekasse?',
        },
        beskrivelse: {
            nb: 'Vi ser at du er under 21 år og går videregående. Da har du mest sannsynlig rett til utstyrstipend fra Lånekassen. ',
        },
        alternativer: JaNeiTilTekst,
    },
    radio_mottar_utstyrsstipend_feilmelding: {
        nb: 'Du må svare på om du mottar utstyrsstipend.',
    },
    radio_mottar_har_funksjonsnedsettelse: {
        header: {
            nb: 'Har du en funksjonsnedsettelse som gir deg særlig store utgifter til læremidler?',
        },
        beskrivelse: {
            nb: 'Du må dokumentere din funskjonsnedsettelse med uttallelse fra helsepersonell.',
        },
        alternativer: JaNeiTilTekst,
    },
    radio_mottar_har_funksjonsnedsettelse_feilmelding: {
        nb: 'Du må svare på om du har en funksjonsnedsettelse som fører til økte utgifter til læremidler.',
    },
};
