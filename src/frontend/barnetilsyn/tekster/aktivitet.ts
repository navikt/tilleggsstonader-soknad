import { jaNeiAlternativer } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { LesMer, Radiogruppe, TekstElement } from '../../typer/tekst';

interface AktivitetInnhold {
    steg_tittel: TekstElement<string>;
    radio_utdanning: Radiogruppe<JaNei>;
    innhold_tittel_utdanning: TekstElement<string>;
    innhold_utdanning: TekstElement<string>;
    godkjent_utdanning: TekstElement<string>;
    noe_feil_utdanning_lesmer: LesMer<string[]>;
    feil_utdanning_infoalert: TekstElement<string[]>;
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
    innhold_tittel_utdanning: {
        nb: 'Utdanning',
    },
    radio_utdanning: {
        header: {
            nb: 'Skal du søke om støtte til pass av barn i forbindelse med denne utdanningen?',
        },
        alternativer: jaNeiAlternativer,
    },
    innhold_utdanning: {
        nb: 'Vi har registrert dette på deg:',
    },
    godkjent_utdanning: {
        nb: 'Utdanning godkjent av NAV',
    },
    noe_feil_utdanning_lesmer: {
        header: { nb: 'Hva gjør jeg hvis noe er feil?' },
        innhold: {
            nb: [
                'Vi anbefaler deg å ta kontakt med din veileder for å få registrert din arbeidsrettede aktivitet eller utdanning.',
                'Du kan fortsatt søke nå, men da kan det ta lengre tid for oss å behandle din søknad. ',
            ],
        },
    },
    feil_utdanning_infoalert: {
        nb: [
            'Vi anbefaler deg å ta kontakt med din veileder for å få registrert din arbeidsrettede aktivitet eller utdanning.',
            'Du kan fortsatt søke nå, men da vil det ta lengre tid for oss å behandle din søknad.',
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
