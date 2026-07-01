import {
    AktivitetInnhold,
    aktivitetTeksterFelles,
    HvilkenAktivitet,
    plukkAktivitetTekster,
    tekstArbeidsrettedeAktiviteter,
} from '../../tekster/aktivitet';
import { AnnenAktivitetType } from '../../typer/aktivitet';

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

export const aktivitetTekster: AktivitetInnhold = {
    ...aktivitetTeksterFelles,
    hvilken_aktivitet: hvilkenAktivitet,
    ingen_aktivitet_infoalert_innhold: {
        del1: {
            nb: [
                'Du kan fortsatt søke, men du kan få avslag hvis du ikke oppfyller vilkårene for støtten.',
                'Merk deg at medisinsk behandling ikke gir rett til støtte ved reise til samling.',
            ],
        },
        del2_lenker: [],
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
};
