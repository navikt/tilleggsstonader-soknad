import { jaNeiAlternativer } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { LesMer, Radiogruppe, TekstElement } from '../../typer/tekst';

interface AktivitetInnhold {
    steg_tittel: TekstElement<string>;
    guide_innhold: TekstElement<string>;
    radio_utdanning: Radiogruppe<JaNei>;
    radio_utdanning_lesmer: LesMer<string[]>;
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
