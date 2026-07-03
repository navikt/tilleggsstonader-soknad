import { JaNeiTilTekst } from './felles';
import { AktivitetTypeUtdanning, AnnenAktivitetType } from '../typer/aktivitet';
import { JaNei } from '../typer/søknad';
import {
    InlineLenke,
    LesMer,
    Radiogruppe,
    RadiogruppeMedUtvalg,
    TekstElement,
} from '../typer/tekst';

export const tekstArbeidsrettedeAktiviteter: {
    checkboks_annet_tekst: TekstElement<string>;
    spm: TekstElement<string>;
    lesMer: {
        header: TekstElement<string>;
        header_ingen_registrerte_aktiviteter: TekstElement<string>;
    };
} = {
    checkboks_annet_tekst: { nb: 'Annet' },
    spm: { nb: 'Hvilken aktivitet søker du om støtte i forbindelse med?' },
    lesMer: {
        header: {
            nb: 'Hva gjør jeg hvis noe mangler eller er feil?',
        },
        header_ingen_registrerte_aktiviteter: {
            nb: 'Hva gjør jeg hvis noe mangler?',
        },
    },
};

interface AktivitetInnholdFelles {
    guide_innhold: TekstElement<string[]>;
    radio_lønnet_tiltak: Radiogruppe<JaNei>;
    checkbox_velge_aktivitet_feilmelding: TekstElement<string>;
    radio_annet_feilmelding: TekstElement<string>;
    ingen_registrerte_aktiviterer_overskrift: TekstElement<string>;
    tittel: TekstElement<string>;
    ingen_aktivitet_infoalert_title: TekstElement<string>;
    radio_lønnet_tiltak_feilmelding: TekstElement<string>;
    radio_annet_uten_registeraktivitet_feilmelding: TekstElement<string>;
    radio_fortsatt_søke: Radiogruppe<JaNei>;
    søker_fra_label: TekstElement<string>;
    søker_fra_lesmer: LesMer<string[]>;
    søker_fra_dato_feilmelding: TekstElement<string>;
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

const aktivitetTypeTilTekst: Record<AnnenAktivitetType, TekstElement<string>> = {
    TILTAK: { nb: 'Tiltak / arbeidsrettet utredning' },
    UTDANNING: { nb: 'Utdanning godkjent av Nav' },
    ARBEIDSSØKER: { nb: 'Jeg er arbeidssøker' },
    INGEN_AKTIVITET: { nb: 'Har ingen arbeidsrettet aktivitet' },
};

export interface AktivitetInnhold extends AktivitetInnholdFelles {
    radio_annet: RadiogruppeMedUtvalg<AnnenAktivitetType>;
    radio_annet_uten_registeraktivitet: RadiogruppeMedUtvalg<AnnenAktivitetType>;
    radio_annet_lesmer: LesMer<InlineLenke>;
    radio_annet_lesmer_hva_betyr_alternativene: HvaBetyrAlternativene;
    hvilken_aktivitet: HvilkenAktivitet;
    ingen_aktivitet_infoalert_innhold: IngenAktivitet;
    lønnet_tiltak_infoalert_innhold: TekstElement<string[]>;
}

export const AktivitetTypeUtdanningTilTekst: Record<
    AktivitetTypeUtdanning,
    TekstElement<string>
> = {
    VIDEREGÅENDE: { nb: 'Videregående skole' },
    OPPLÆRING_FOR_VOKSNE: {
        nb: 'Forberedende opplæring for voksne (Tidl. grunnskole for voksne)',
    },
    ANNET_TILTAK: {
        nb: 'Annen aktivitet med mål om arbeid eller utdanning',
    },
};

export const plukkAktivitetTekster = <K extends AnnenAktivitetType>(
    ...typer: K[]
): Record<K, TekstElement<string>> =>
    Object.fromEntries(typer.map((type) => [type, aktivitetTypeTilTekst[type]])) as Record<
        K,
        TekstElement<string>
    >;

export const aktivitetTeksterFelles: AktivitetInnholdFelles = {
    søker_fra_lesmer: {
        header: { nb: 'Hvilken dato velger jeg?' },
        innhold: {
            nb: [
                'Det vanligste er å velge datoen aktiviteten din starter, eller fra da du ble registrert som arbeidssøker. Du får bare dekket utgifter så lenge du har en arbeidsrettet aktivitet.',
                'Du kan søke tilbake i tid, men som hovedregel kan vi bare innvilge inntil 3 måneder fra datoen du søker.',
            ],
        },
    },
    søker_fra_label: { nb: 'Fra hvilken dato søker du om støtte?' },
    søker_fra_dato_feilmelding: { nb: 'Du må fylle inn en gyldig dato' },
    tittel: {
        nb: 'Arbeidsrettet aktivitet',
    },
    guide_innhold: {
        nb: [
            'For å få denne stønaden må du delta på tiltak, ta en utdanning godkjent av Nav, være arbeidssøker eller gjennomføre en arbeidsrettet utredning.',
            'Vi viser aktivitetene som er registrert på deg de siste 3 månedene.',
        ],
    },
    radio_lønnet_tiltak: {
        header: {
            nb: 'Mottar du lønn gjennom et tiltak?',
        },
        alternativer: JaNeiTilTekst,
    },
    checkbox_velge_aktivitet_feilmelding: {
        nb: 'Du må svare på hvilken aktivitet du søker om støtte i forbindelse med.',
    },
    radio_lønnet_tiltak_feilmelding: {
        nb: 'Du må svare på om du mottar lønn gjennom et tiltak.',
    },
    ingen_aktivitet_infoalert_title: { nb: 'Ingen arbeidsrettet aktivitet?' },
    radio_fortsatt_søke: {
        header: {
            nb: 'Vil du fortsatt søke nå?',
        },
        alternativer: JaNeiTilTekst,
    },
    radio_annet_feilmelding: {
        nb: 'Du må svare på hvilken aktivitet du søker om støtte i forbindelse med.',
    },
    radio_annet_uten_registeraktivitet_feilmelding: {
        nb: 'Du må velge en aktivitet',
    },
    ingen_registrerte_aktiviterer_overskrift: {
        nb: 'Vi fant dessverre ingen arbeidsrettede aktiviteter som er registrert på deg.',
    },
};
