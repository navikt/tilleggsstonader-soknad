import { jaNeiAlternativer } from '../../tekster/felles';
import { AnnenAktivitetType } from '../../typer/aktivitet';
import { JaNei } from '../../typer/søknad';
import { InlineLenke, LesMer, Radiogruppe, TekstElement } from '../../typer/tekst';

interface AktivitetInnhold {
    guide_innhold: TekstElement<string[]>;
    radio_lønnet_tiltak: Radiogruppe<JaNei>;
    radio_annet: Radiogruppe<AnnenAktivitetType>;
    radio_utdanning: Radiogruppe<JaNei>;
    radio_utdanning_lesmer: LesMer<string[]>;
    radio_annet_lesmer: LesMer<InlineLenke>;
    tittel: TekstElement<string>;
    feil_utdanning_infoalert_title: TekstElement<string>;
    feil_utdanning_infoalert_innhold: TekstElement<string[]>;
    lønnet_tiltak_infoalert_innhold: TekstElement<string[]>;
    radio_fortsatt_søke: Radiogruppe<JaNei>;
    søker_fra_label: TekstElement<string>;
    søker_fra_lesmer: LesMer<string[]>;
    søker_fra_dato_feilmelding: TekstElement<string>;
    hvilken_aktivitet: HvilkenAktivitet;
}

interface HvilkenAktivitet {
    spm: TekstElement<string>;
    checkboks_annet_tekst: TekstElement<string>;
    les_mer: {
        header: TekstElement<string>;
        del1: TekstElement<string[]>;
        del2_lenker: TekstElement<InlineLenke>[];
        del3: TekstElement<InlineLenke>;
    };
}

export const AktivitetTypeTilTekst: Record<AnnenAktivitetType, TekstElement<string>> = {
    TILTAK: { nb: 'Tiltak / arbeidsrettet utredning' },
    UTDANNING: {
        nb: 'Utdanning godkjent av NAV',
    },
    ARBEIDSSØKER: {
        nb: 'Jeg er arbeidssøker',
    },
    INGEN_AKTIVITET: {
        nb: 'Har ingen arbeidsrettet aktivitet',
    },
};

const hvilkenAktivitet: HvilkenAktivitet = {
    spm: { nb: 'Hvilken aktivitet søker du om støtte i forbindelse med?' },
    checkboks_annet_tekst: { nb: 'Annet' },
    les_mer: {
        header: {
            nb: 'Hva gjør jeg hvis noe mangler eller er feil?',
        },
        del1: {
            nb: [
                'Vi henter tiltak og utdanning registrert på deg 3 måneder tilbake i tid. Er du registrert arbeidssøker kan vi ikke hente det.',
                'Hvis aktiviteten din mangler eller det er noe feil anbefaler vi deg å ta kontakt med veilederen din. Du kan fortsatt søke nå, men det tar lengre tid for oss å behandle din søknad hvis vi må kontakte veilederen din for deg.',
                'Merk deg at medisinsk behandling ikke gir rett til støtte for pass av barn.',
                'Er du enslig forsørger/gjenlevende og i arbeid, er det andre søknader du skal fylle ut: ',
            ],
        },
        del2_lenker: [
            {
                nb: [
                    'for ',
                    {
                        tekst: 'enslig mor/far',
                        url: 'https://www.nav.no/barnetilsyn-enslig',
                        variant: 'neutral',
                    },
                    ' (åpnes i ny fane)',
                ],
            },
            {
                nb: [
                    'for ',
                    {
                        tekst: 'gjenlevende',
                        url: 'https://www.nav.no/barnetilsyn-gjenlevende',
                        variant: 'neutral',
                    },
                    ' (åpnes i ny fane)',
                ],
            },
        ],
        del3: {
            nb: [
                'Hvis du skal søke støtte i forbindelse med en aktivitet som ble avsluttet for over 3 måneder siden, må du fylle ut ',
                {
                    tekst: 'papirsøknad',
                    url: 'https://www.nav.no/fyllut/nav111215b?sub=paper',
                    variant: 'neutral',
                },
                '.',
            ],
        },
    },
};

export const aktivitetTekster: AktivitetInnhold = {
    søker_fra_lesmer: {
        header: { nb: 'Hvilken dato velger jeg?' },
        innhold: {
            nb: [
                'Det vanligste er å velge datoen utdanningen din starter eller fra da du ble registrert arbeidssøker. Du får bare dekket utgifter så lenge du har en arbeidsrettet aktivitet. ',
                'Du kan søke tilbake i tid, men som hovedregel kan vi bare innvilge inntil 3 måneder fra datoen du søker.',
            ],
        },
    },
    søker_fra_label: { nb: 'Fra hvilken dato søker du om støtte til pass?' },
    søker_fra_dato_feilmelding: { nb: 'Du må fylle inn en gyldig dato' },
    tittel: {
        nb: 'Arbeidsrettet aktivitet',
    },
    guide_innhold: {
        nb: [
            'For å få dekket pass av barn må du delta på ett tiltak, ta en utdannelse godkjent av NAV, være arbeidssøker eller gjennomføre en arbeidsrettet utredning.',
            'Vi henter aktiviteter registrert på deg 3 måneder tilbake i tid.',
        ],
    },
    hvilken_aktivitet: hvilkenAktivitet,
    radio_lønnet_tiltak: {
        header: {
            nb: 'Mottar du lønn gjennom et tiltak?',
        },
        alternativer: jaNeiAlternativer,
    },
    lønnet_tiltak_infoalert_innhold: {
        nb: [
            'Hvis du mottar lønn i tiltaket kan du fortsatt søke, men det kan hende du får avslag.',
            'Som lærling kan du få støtte til pass av barn, selv om du mottar lønn.',
        ],
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
    radio_annet_lesmer: {
        header: { nb: 'Søke lengre tilbake enn 3 måneder?' },
        innhold: {
            nb: [
                'Hvis du skal søke i forbindelse med en aktivitet som ble avsluttet for over 3 måneder siden, må du fylle ut ',
                {
                    tekst: 'papirsøknad',
                    url: 'https://tjenester.nav.no/soknadtilleggsstonader/app/start',
                    variant: 'neutral',
                },
                '.',
            ],
        },
    },
    radio_annet: {
        header: { nb: 'Hvilken annen type arbeidsrettet aktivitet har du?' },
        alternativer: [
            {
                value: AnnenAktivitetType.TILTAK,
                label: AktivitetTypeTilTekst.TILTAK,
            },
            {
                value: AnnenAktivitetType.UTDANNING,
                label: AktivitetTypeTilTekst.UTDANNING,
            },
            {
                value: AnnenAktivitetType.ARBEIDSSØKER,
                label: AktivitetTypeTilTekst.ARBEIDSSØKER,
            },
            {
                value: AnnenAktivitetType.INGEN_AKTIVITET,
                label: AktivitetTypeTilTekst.INGEN_AKTIVITET,
            },
        ],
    },
};
