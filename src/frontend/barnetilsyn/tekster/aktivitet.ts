import { jaNeiAlternativer } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { LesMer, Radiogruppe, TekstElement } from '../../typer/tekst';

interface AktivitetInnhold {
    steg_tittel: TekstElement<string>;
    radio_utdanning: Radiogruppe<JaNei>;
    innhold_tittel_utdanning: TekstElement<string>;
    innhold_utdanning: TekstElement<string>;
    godkjent_utdanning: TekstElement<string>;
    noe_feil_utdanning_lesmer: TekstElement<LesMer>;
    feil_utdanning_infoalert: TekstElement<string[]>;
    radio_fortsatt_søke: Radiogruppe<JaNei>;
}

export const aktivitetTekster: AktivitetInnhold = {
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
        nb: {
            header: 'Hva gjør jeg hvis noe er feil?',
            innhold: [
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
