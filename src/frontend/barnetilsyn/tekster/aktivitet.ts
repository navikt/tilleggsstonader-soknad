import { jaNeiAlternativer } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

interface AktivitetInnhold {
    steg_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    radio_utdanning: Radiogruppe<JaNei>;
    innhold_tittel: TekstElement<string>;
    feil_utdanning_infoalert: TekstElement<string[]>;
    radio_fortsatt_søke: Radiogruppe<JaNei>;
}

export const aktivitetTekster: AktivitetInnhold = {
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
            nb: 'Skal du søke om støtte til pass av barn i forbindelse med denne utdanningen?',
        },
        alternativer: jaNeiAlternativer,
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
