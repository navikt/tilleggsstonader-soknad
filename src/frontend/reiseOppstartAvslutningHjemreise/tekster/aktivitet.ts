import {
    AktivitetInnhold,
    aktivitetTeksterFelles,
    plukkAktivitetTekster,
    tekstArbeidsrettedeAktiviteter,
} from '../../tekster/aktivitet';
import { AnnenAktivitetType } from '../../typer/aktivitet';
import { TekstElement } from '../../typer/tekst';

// TODO: placeholder-tekster - dette er et skjelett og innholdet må erstattes med endelig tekst
export const AktivitetTypeTilTekstReiseOppstartAvslutningHjemreise = plukkAktivitetTekster(
    AnnenAktivitetType.TILTAK,
    AnnenAktivitetType.UTDANNING,
    AnnenAktivitetType.INGEN_AKTIVITET
);

interface AktivitetInnholdReiseOppstartAvslutningHjemreise extends AktivitetInnhold {
    ingen_aktivitet_infoalert_innhold: TekstElement<string>;
}

export const aktivitetTekster: AktivitetInnholdReiseOppstartAvslutningHjemreise = {
    ...aktivitetTeksterFelles,
    guide_innhold: {
        nb: [
            'For å få denne stønaden må du delta på  arbeidsrettet tiltak, gjennomføre en utdanning godkjent av Nav eller en arbeidsrettet utredning.',
            'Vi viser aktivitetene som er registrert på deg de siste 6 månedene.',
        ],
    },
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
                    'Vi henter tiltak og utdanning registrert på deg 6 måneder tilbake i tid.',
                    'Hvis aktiviteten din mangler eller det er noe feil anbefaler vi deg å ta kontakt med veilederen din. Du kan fortsatt søke nå, men det tar lengre tid for oss å behandle din søknad hvis vi må kontakte veilederen din for deg.',
                ],
            },
            del2_lenker: [],
            del3: {
                nb: [
                    'Hvis du skal søke støtte i forbindelse med en aktivitet som ble avsluttet for mer enn 6 måneder siden, må du ',
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
        header: { nb: 'Lønn i tiltak' },
        innhold: {
            nb: [
                'Hvis du mottar lønn i tiltaket kan du fortsatt søke, men det kan hende du får avslag.',
                'Som lærling kan du ha rett til støtte til reise ved oppstart, avslutning og hjemreiser selv om du mottar lønn.',
            ],
        },
    },
    ingen_aktivitet_infoalert_innhold: {
        nb: 'Ut i fra svarene dine ser det ikke ut som du deltar på arbeidsrettet aktivitet. Du kan fortsatt søke, men vil mest sannsynlig få avslag.',
    },
    radio_annet_lesmer: {
        header: { nb: 'Søke lengre tilbake enn 6 måneder?' },
        innhold: {
            nb: [
                'Du må sende inn søknad på papir hvis du skal søke om en aktivitet som ble avsluttet for mer enn 6 måneder siden. ',
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
                    'Velg Tiltak og arbeidsrettet utredning hvis du deltar på et arbeidsrettet tiltak, for eksempel kurs eller arbeidstrening. Dette gjelder hvis du mottar arbeidsavklaringspenger (AAP), uføretrygd, aktivitetspenger for unge, tiltakspenger, dagpenger eller kvalifiseringsstønad. Det gjelder også hvis du har nedsatt arbeidsevne eller sitter i fengsel og ellers ville hatt rett til tiltakspenger.',
                    'Velg Utdanning godkjent av Nav dersom du er enslig mor eller far eller gjenlevende og gjennomfører utdanning som er godkjent av Nav.',
                ],
            },
            del2_lenker: [],
        },
    },
    radio_annet: {
        header: { nb: 'Hvilken annen type arbeidsrettet aktivitet har du?' },
        alternativer: AktivitetTypeTilTekstReiseOppstartAvslutningHjemreise,
        feilmelding: {
            nb: 'Du må svare på hvilken aktivitet du søker om støtte i forbindelse med.',
        },
    },
    radio_annet_uten_registeraktivitet: {
        header: { nb: 'Hvilken arbeidsrettet aktivitet har du?' },
        alternativer: AktivitetTypeTilTekstReiseOppstartAvslutningHjemreise,
        feilmelding: { nb: 'Du må velge en aktivitet' },
    },
};
