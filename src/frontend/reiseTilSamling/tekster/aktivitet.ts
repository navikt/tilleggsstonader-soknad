import {
    AktivitetInnhold,
    aktivitetTeksterFelles,
    AktivitetTypeUtdanningTilTekst,
    HvilkenAktivitet,
    plukkAktivitetTekster,
    tekstArbeidsrettedeAktiviteter,
} from '../../tekster/aktivitet';
import { AktivitetTypeUtdanning, AnnenAktivitetType } from '../../typer/aktivitet';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

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
    spm: tekstArbeidsrettedeAktiviteter.spm,
    les_mer: {
        header: tekstArbeidsrettedeAktiviteter.lesMer.header,
        header_ingen_registrerte_aktiviteter:
            tekstArbeidsrettedeAktiviteter.lesMer.header_ingen_registrerte_aktiviteter,
        del1: {
            nb: [
                'Vi henter tiltak og utdanning registrert på deg 3 måneder tilbake i tid. Er du registrert som arbeidssøker, kan vi ikke hente det.',
                'Hvis aktiviteten din mangler eller det er noe feil, anbefaler vi at du tar kontakt med veilederen din. Du kan fortsatt søke nå, men det kan ta lengre tid å behandle søknaden hvis vi må kontakte veilederen din for deg.',
            ],
        },
        del2_lenker: [],
        del3: {
            nb: [
                'Hvis du skal søke støtte i forbindelse med en aktivitet som ble avsluttet for over 3 måneder siden, må du ',
                {
                    tekst: 'fylle ut papirsøknad',
                    url: 'https://www.nav.no/fyllut/nav111217b?sub=paper',
                },
                '.',
            ],
        },
    },
};

export const AktivitetTypeTilTekstReiseTilSamling = plukkAktivitetTekster(
    AnnenAktivitetType.TILTAK,
    AnnenAktivitetType.UTDANNING,
    AnnenAktivitetType.INGEN_AKTIVITET
);

interface AktivitetInnholdDagligAktivitet extends AktivitetInnhold {
    radio_type_arbeidsrettede_aktiviteter: Radiogruppe<AktivitetTypeUtdanning>;
}

export const aktivitetTekster: AktivitetInnholdDagligAktivitet = {
    ...aktivitetTeksterFelles,
    hvilken_aktivitet: hvilkenAktivitet,

    lønnet_tiltak_infoalert_innhold: {
        nb: [
            'Hvis du mottar lønn i tiltaket kan du fortsatt søke, men det kan hende du får avslag.',
            'Som lærling kan du ha rett til støtte ved reise til samling selv om du mottar lønn.',
        ],
    },
    ingen_aktivitet_infoalert_innhold: {
        del1: {
            nb: [
                'Du kan fortsatt søke, men du kan få avslag hvis du ikke oppfyller vilkårene for støtten.',
                'Merk deg at medisinsk behandling ikke gir rett til støtte ved reise til samling.',
            ],
        },
        del2_lenker: [],
    },
    radio_annet_lesmer: {
        header: { nb: 'Søke lengre tilbake enn 3 måneder?' },
        innhold: {
            nb: [
                'Du må sende inn søknad på papir hvis du skal søke om en aktivitet som ble avsluttet for mer enn 3 måneder siden. ',
                {
                    tekst: 'Søknad på papir',
                    url: 'https://www.nav.no/fyllut/nav111217b?sub=paper',
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
                    'Tiltak og arbeidsrettet utredning er for deg som mottar arbeidsavklaringspenger, uføretrygd eller har nedsatt arbeidsevne.',
                    'Et tiltak kan for eksempel være kurs eller arbeidstrening. Arbeidsrettet utredning er en prosess der ferdighetene og mulighetene dine til å utføre arbeid blir vurdert og kartlagt.',
                    'Utdanningen må være godkjent av Nav for å gi rett til støtte.',
                    'Er du registrert som arbeidssøker hos Nav, må du søke jobb aktivt eller gjennomføre annen arbeidsrettet aktivitet.',
                ],
            },
            del2_lenker: [],
        },
    },
    radio_annet: {
        header: { nb: 'Hvilken annen type arbeidsrettet aktivitet har du?' },
        alternativer: AktivitetTypeTilTekstReiseTilSamling,
    },
    radio_annet_uten_registeraktivitet: {
        header: { nb: 'Hvilken arbeidsrettet aktivitet har du?' },
        alternativer: AktivitetTypeTilTekstReiseTilSamling,
    },
    radio_type_arbeidsrettede_aktiviteter: {
        header: { nb: 'Hva slags type arbeidsrettet aktivitet går du du på?' },
        alternativer: AktivitetTypeUtdanningTilTekst,
    },
};
