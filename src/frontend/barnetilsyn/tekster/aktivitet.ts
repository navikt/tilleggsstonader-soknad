import { tekstArbeidsrettedeAktiviteter } from '../../tekster/aktivitet';
import { JaNeiTilTekst } from '../../tekster/felles';
import { AnnenAktivitetType } from '../../typer/aktivitet';
import { JaNei } from '../../typer/søknad';
import { InlineLenke, LesMer, Radiogruppe, TekstElement } from '../../typer/tekst';

interface AktivitetInnhold {
    guide_innhold: TekstElement<string[]>;
    radio_lønnet_tiltak: Radiogruppe<JaNei>;
    checkbox_velge_aktivitet_feilmelding: TekstElement<string>;
    radio_annet: Radiogruppe<AnnenAktivitetType>;
    radio_annet_uten_registeraktivitet: Radiogruppe<AnnenAktivitetType>;
    radio_annet_lesmer: LesMer<InlineLenke>;
    radio_annet_lesmer_hva_betyr_alternativene: HvaBetyrAlternativene;
    radio_annet_feilmelding: TekstElement<string>;
    ingen_registrerte_aktiviterer_overskrift: TekstElement<string>;
    tittel: TekstElement<string>;
    ingen_aktivitet_infoalert_title: TekstElement<string>;
    ingen_aktivitet_infoalert_innhold: IngenAktivitet;
    lønnet_tiltak_infoalert_innhold: TekstElement<string[]>;
    radio_lønnet_tiltak_feilmelding: TekstElement<string>;
    radio_fortsatt_søke: Radiogruppe<JaNei>;
    søker_fra_label: TekstElement<string>;
    søker_fra_lesmer: LesMer<string[]>;
    søker_fra_dato_feilmelding: TekstElement<string>;
    hvilken_aktivitet: HvilkenAktivitet;
}

interface HvilkenAktivitet {
    spm: TekstElement<string>;
    les_mer: {
        header: TekstElement<string>;
        header_ingen_registrerte_aktiviteter: TekstElement<string>;
        del1: TekstElement<string[]>;
        del2_lenker: TekstElement<InlineLenke>[];
        del3: TekstElement<InlineLenke>;
    };
}
interface HvaBetyrAlternativene {
    header: TekstElement<string>;
    innhold: {
        del1: TekstElement<string[]>;
        del2_lenker: TekstElement<InlineLenke>[];
    };
}
interface IngenAktivitet {
    del1: TekstElement<string[]>;
    del2_lenker: TekstElement<InlineLenke>[];
}

export const AktivitetTypeTilTekst: Record<AnnenAktivitetType, TekstElement<string>> = {
    TILTAK: { nb: 'Tiltak / arbeidsrettet utredning' },
    UTDANNING: {
        nb: 'Utdanning godkjent av Nav',
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
    les_mer: {
        header: tekstArbeidsrettedeAktiviteter.lesMer.header,
        header_ingen_registrerte_aktiviteter:
            tekstArbeidsrettedeAktiviteter.lesMer.header_ingen_registrerte_aktiviteter,
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
                'Hvis du skal søke støtte i forbindelse med en aktivitet som ble avsluttet for over 3 måneder siden, må du ',
                {
                    tekst: 'fylle ut papirsøknad',
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
            'For å få denne stønaden må du delta på tiltak, ta en utdannelse godkjent av Nav, være arbeidssøker eller gjennomføre en arbeidsrettet utredning.',
            'Vi viser aktivitetene som er registrert på deg de siste 3 månedene.',
        ],
    },
    hvilken_aktivitet: hvilkenAktivitet,
    radio_lønnet_tiltak: {
        header: {
            nb: 'Mottar du lønn gjennom et tiltak?',
        },
        alternativer: JaNeiTilTekst,
    },
    checkbox_velge_aktivitet_feilmelding: {
        nb: 'Du må svare på hvilken aktivitet du søker om støtte i forbindelse med.',
    },
    lønnet_tiltak_infoalert_innhold: {
        nb: [
            'Hvis du mottar lønn i tiltaket kan du fortsatt søke, men det kan hende du får avslag.',
            'Som lærling kan du få støtte til pass av barn, selv om du mottar lønn.',
        ],
    },
    radio_lønnet_tiltak_feilmelding: {
        nb: 'Du må svare på om du mottar lønn gjennom et tiltak.',
    },
    ingen_aktivitet_infoalert_title: { nb: 'Ingen arbeidsrettet aktivitet?' },
    ingen_aktivitet_infoalert_innhold: {
        del1: {
            nb: [
                'Du kan fortsatt søke, men du kan få avslag.',
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
    },
    radio_fortsatt_søke: {
        header: {
            nb: 'Vil du fortsatt søke nå?',
        },
        alternativer: JaNeiTilTekst,
    },
    radio_annet_lesmer: {
        header: { nb: 'Søke lengre tilbake enn 3 måneder?' },
        innhold: {
            nb: [
                'Du må sende inn ',
                {
                    tekst: 'søknad på papir',
                    url: 'https://www.nav.no/fyllut/nav111215b?sub=paper',
                    variant: 'neutral',
                },
                ' hvis du skal søke om en aktivitet som ble avsluttet for mer enn 3 måneder siden.',
            ],
        },
    },
    radio_annet_lesmer_hva_betyr_alternativene: {
        header: { nb: 'Hva betyr alternativene?' },
        innhold: {
            del1: {
                nb: [
                    'Tiltak og arbeidsrettet utredning er for deg som mottar arbeidsavklaringspenger, uføretrygd eller har nedsatt arbeidsevne. ',
                    'Et tiltak kan for eksempel være kurs eller arbeidstrening. Arbeidsrettet utredning er en prosess der dine ferdigheter og muligheter til å utføre arbeid blir vurdert og kartlagt.',
                    'Er du enslig mor eller far eller gjenlevende må en utdanning godkjennes av din veileder for å gi rett til støtte til pass. ',
                    'Hvis du er enslig mor eller far eller gjenlevende kan du få støtte til pass av barn når du er registrert som arbeidssøker hos Nav. Du må søke jobb aktivt, eller gjennomføre annen arbeidsrettet aktivitet.',
                    'Er du i arbeid, skal du fylle ut en annen søknad avhengig av din situasjon:',
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
        },
    },
    radio_annet: {
        header: { nb: 'Hvilken annen type arbeidsrettet aktivitet har du?' },
        alternativer: AktivitetTypeTilTekst,
    },
    radio_annet_uten_registeraktivitet: {
        header: { nb: 'Hvilken arbeidsrettet aktivitet har du?' },
        alternativer: AktivitetTypeTilTekst,
    },
    radio_annet_feilmelding: {
        nb: 'Du må svare på hvilken aktivitet du søker om støtte i forbindelse med.',
    },
    ingen_registrerte_aktiviterer_overskrift: {
        nb: 'Vi fant dessverre ingen arbeidsrettede aktiviteter som er registrert på deg.',
    },
};
