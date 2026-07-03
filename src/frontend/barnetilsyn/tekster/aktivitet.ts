import {
    AktivitetInnhold,
    aktivitetTeksterFelles,
    plukkAktivitetTekster,
    tekstArbeidsrettedeAktiviteter,
} from '../../tekster/aktivitet';
import { AnnenAktivitetType } from '../../typer/aktivitet';

export const AktivitetTypeTilTekstPassAvBarn = plukkAktivitetTekster(
    AnnenAktivitetType.TILTAK,
    AnnenAktivitetType.UTDANNING,
    AnnenAktivitetType.ARBEIDSSØKER,
    AnnenAktivitetType.INGEN_AKTIVITET
);

export const aktivitetTekster: AktivitetInnhold = {
    ...aktivitetTeksterFelles,
    hvilken_aktivitet: {
        spm: tekstArbeidsrettedeAktiviteter.spm,
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
                    },
                    '.',
                ],
            },
        },
    },
    lønnet_tiltak_infoalert_innhold: {
        nb: [
            'Hvis du mottar lønn i tiltaket kan du fortsatt søke, men det kan hende du får avslag.',
            'Som lærling kan du ha rett til støtte til pass av barn selv om du mottar lønn.',
        ],
    },
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
                    },
                    ' (åpnes i ny fane)',
                ],
            },
        ],
    },
    radio_annet_lesmer: {
        header: { nb: 'Søke lengre tilbake enn 3 måneder?' },
        innhold: {
            nb: [
                'Du må sende inn søknad på papir hvis du skal søke om en aktivitet som ble avsluttet for mer enn 3 måneder siden. ',
                {
                    tekst: 'Søknad på papir',
                    url: 'https://www.nav.no/fyllut/nav111215b?sub=paper',
                },
                '.',
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
                        },
                        ' (åpnes i ny fane)',
                    ],
                },
            ],
        },
    },
    radio_annet: {
        header: { nb: 'Hvilken annen type arbeidsrettet aktivitet har du?' },
        alternativer: AktivitetTypeTilTekstPassAvBarn,
    },
    radio_annet_uten_registeraktivitet: {
        header: { nb: 'Hvilken arbeidsrettet aktivitet har du?' },
        alternativer: AktivitetTypeTilTekstPassAvBarn,
    },
};
