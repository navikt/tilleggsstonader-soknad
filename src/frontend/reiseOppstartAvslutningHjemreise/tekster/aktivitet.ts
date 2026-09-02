import {
    AktivitetInnhold,
    aktivitetTeksterFelles,
    plukkAktivitetTekster,
    tekstArbeidsrettedeAktiviteter,
} from '../../tekster/aktivitet';
import { JaNeiTilTekst } from '../../tekster/felles';
import { AnnenAktivitetType } from '../../typer/aktivitet';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

// TODO: placeholder-tekster - dette er et skjelett og innholdet må erstattes med endelig tekst
export const AktivitetTypeTilTekstReiseOppstartAvslutningHjemreise = plukkAktivitetTekster(
    AnnenAktivitetType.TILTAK,
    AnnenAktivitetType.UTDANNING,
    AnnenAktivitetType.ARBEIDSSØKER,
    AnnenAktivitetType.INGEN_AKTIVITET
);

interface AktivitetInnholdReiseOppstartAvslutningHjemreise extends AktivitetInnhold {
    radio_må_bo_borte_hjemmefra: Radiogruppe<JaNei>;
    radio_må_bo_borte_hjemmefra_feilmelding: TekstElement<string>;
    advarsel_må_bo_borte_hjemmefra: TekstElement<string>;
}

export const aktivitetTekster: AktivitetInnholdReiseOppstartAvslutningHjemreise = {
    ...aktivitetTeksterFelles,
    søker_fra_lesmer: {
        header: { nb: 'Hvilken dato velger jeg?' },
        innhold: {
            nb: [
                'Det vanligste er å velge datoen aktiviteten din starter, eller fra da du ble registrert som arbeidssøker.',
                'Du kan søke tilbake i tid, men som hovedregel kan vi bare innvilge inntil 3 måneder fra datoen du søker.',
            ],
        },
    },
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
                ],
            },
            del2_lenker: [],
            del3: {
                nb: [
                    'Hvis du skal søke støtte i forbindelse med en aktivitet som ble avsluttet for mer enn 3 måneder siden, må du ',
                    {
                        tekst: 'fylle ut papirsøknad',
                        url: 'https://www.nav.no/fyllut/nav111218b?sub=paper',
                    },
                    '.',
                ],
            },
        },
    },
    lønnet_tiltak_infoalert_innhold: {
        nb: [
            'Hvis du mottar lønn i tiltaket kan du fortsatt søke, men det kan hende du får avslag.',
            'Som lærling kan du ha rett til støtte selv om du mottar lønn.',
        ],
    },
    ingen_aktivitet_infoalert_innhold: {
        del1: {
            nb: ['Du kan fortsatt søke, men du kan få avslag.'],
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
                    url: 'https://www.nav.no/fyllut/nav111218b?sub=paper',
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
                ],
            },
            del2_lenker: [],
        },
    },
    radio_annet: {
        header: { nb: 'Hvilken annen type arbeidsrettet aktivitet har du?' },
        alternativer: AktivitetTypeTilTekstReiseOppstartAvslutningHjemreise,
    },
    radio_annet_uten_registeraktivitet: {
        header: { nb: 'Hvilken arbeidsrettet aktivitet har du?' },
        alternativer: AktivitetTypeTilTekstReiseOppstartAvslutningHjemreise,
    },
    radio_må_bo_borte_hjemmefra: {
        header: {
            nb: 'Må du midlertidig bo borte hjemmefra for å delta på denne aktiviteten?',
        },
        alternativer: JaNeiTilTekst,
    },
    radio_må_bo_borte_hjemmefra_feilmelding: {
        nb: 'Du må svare på om du må bo borte hjemmefra for å delta på aktiviteten.',
    },
    advarsel_må_bo_borte_hjemmefra: {
        nb: 'Du har ikke rett på pengestøtte til reise ved oppstart, avslutning eller hjemreise dersom du ikke midlertidig må bo borte hjemmefra. Du kan fortsatt søke, men det kan hende du får avslag.',
    },
};
