import { jaNeiAlternativer } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { LesMer, Radiogruppe, TekstElement } from '../../typer/tekst';

interface AktivitetInnhold {
    steg_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    radio_utdanning: Radiogruppe<JaNei>;
    radio_utdanning_lesmer: LesMer<string[]>;
    innhold_tittel: TekstElement<string>;
    feil_utdanning_infoalert_title: TekstElement<string>;
    feil_utdanning_infoalert_innhold: TekstElement<string[]>;
    radio_fortsatt_søke: Radiogruppe<JaNei>;
    søker_fra_label: TekstElement<string>;
    søker_fra_lesmer: LesMer<string[]>;
    søker_fra_dato_feilmelding: TekstElement<string>;
}

export const aktivitetTekster: AktivitetInnhold = {
    søker_fra_lesmer: {
        header: { nb: 'Hvordan velge dato' },
        innhold: {
            nb: [
                'Det vanligste er å velge datoen utdanningen din starter eller fra da du ble registrert arbeidssøker. Du får bare dekket utgifter så lenge du har en arbeidsrettet aktivitet. ',
                'Du kan søke tilbake i tid, men som hovedregel kan vi bare innvilge inntil 3 måneder fra datoen du søker.',
            ],
        },
    },
    søker_fra_label: { nb: 'Fra hvilken dato søker du om støtte til pass?' },
    søker_fra_dato_feilmelding: { nb: 'Du må fylle inn en gyldig dato' },
    steg_tittel: {
        nb: 'Aktivitet',
    },
    innhold_tittel: {
        nb: 'Arbeidsrettet aktivitet',
    },
    guide_innhold: {
        nb: 'For å få dekket pass av barn må du delta på ett tiltak godkjent av NAV eller gjennomføre en arbeidsrettet utredning.',
    },
    radio_utdanning: {
        header: {
            nb: 'Deltar du på eller skal du begynne på et arbeidsrettet tiltak eller en utredning?',
        },
        alternativer: jaNeiAlternativer,
    },
    radio_utdanning_lesmer: {
        header: { nb: 'Hva betyr tiltak og utredning?' },
        innhold: {
            nb: [
                'Tiltak avtales mellom deg og din veileder og skal hjelpe deg med å komme inn i eller tilbake til arbeidslivet. Et tiltak kan for eksempel være utdanning, kurs eller arbeidstrening.',
                'Arbeidsrettet utredning er en prosess der dine ferdigheter og muligheter til å utføre arbeid blir vurdert og kartlagt.',
            ],
        },
    },
    feil_utdanning_infoalert_title: { nb: 'Ingen arbeidsrettet aktivitet?' },
    feil_utdanning_infoalert_innhold: {
        nb: [
            'Du kan fortsatt søke, men det kan hende du får avslag.',
            'Merk deg at medisinsk behandling ikke gir rett til støtte for pass av barn.',
        ],
    },
    radio_fortsatt_søke: {
        header: {
            nb: 'Vil du fortsatt søke nå?',
        },
        alternativer: jaNeiAlternativer,
    },
};
