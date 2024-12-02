import { tekstArbeidsrettedeAktiviteter } from '../../tekster/aktivitet';
import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { InlineLenke, Radiogruppe, TekstElement } from '../../typer/tekst';
import { AnnenUtdanningType } from '../typer/søknad';

interface AktivitetInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
    hvilken_aktivitet: HvilkenAktivitet;
    ingen_registrerte_aktiviterer_overskrift: TekstElement<string>;
    checkbox_velge_aktivitet_feilmelding: TekstElement<string>;
    radio_annen_utdanning: Radiogruppe<AnnenUtdanningType>;
    radio_annen_utdanning_feilmelding: TekstElement<string>;
    ingen_utdanning_alert_tittel: TekstElement<string>;
    ingen_utdanning_alert_innhold: TekstElement<string>;
    radio_mottar_har_funksjonsnedsettelse: Radiogruppe<JaNei>;
    radio_mottar_har_funksjonsnedsettelse_feilmelding: TekstElement<string>;
    radio_lærling_etc: Radiogruppe<JaNei>;
    radio_lærling_feilmelding: TekstElement<string>;
    les_mer_lærling_etc: {
        header: TekstElement<string>;
        innhold_lærling: TekstElement<InlineLenke>;
        innhold_lærekandidatordningen: TekstElement<InlineLenke>;
        innhold_praksisbrevkandidater: TekstElement<InlineLenke>;
        innhold_fagbrev_på_jobb: TekstElement<InlineLenke>;
    };
}

interface HvilkenAktivitet {
    spm: TekstElement<string>;
    les_mer: {
        header: TekstElement<string>;
        header_ingen_registrerte_aktiviteter: TekstElement<string>;
        del1: TekstElement<string>;
        del2: TekstElement<string>;
        del3: TekstElement<InlineLenke>;
    };
}

const AnnenUtdanningTypeTilTekst: Record<AnnenUtdanningType, TekstElement<string>> = {
    VIDEREGÅENDE_FORKURS: { nb: 'Videregående utdanning eller forkurs' },
    FAGSKOLE_HØGSKOLE_UNIVERSITET: {
        nb: 'Høgskole, universitet eller fagskole',
    },
    KURS_LIKNENDE: {
        nb: 'Kurs eller lignende',
    },
    INGEN_UTDANNING: {
        nb: 'Jeg skal ikke ta utdanning eller opplæring',
    },
};

const hvilkenAktivitet: HvilkenAktivitet = {
    spm: {
        nb: 'Hvilken utdanning eller opplæring søker du om støtte til læremidler for?',
    },
    les_mer: {
        header: tekstArbeidsrettedeAktiviteter.lesMer.header,
        header_ingen_registrerte_aktiviteter:
            tekstArbeidsrettedeAktiviteter.lesMer.header_ingen_registrerte_aktiviteter,
        del1: {
            nb: 'Vi henter tiltak og utdanning registrert på deg 3 måneder tilbake i tid. Er du enslig eller gjenlevende så er det ikke alltid dette er registert på en måte så vi klare å hente det.',
        },
        del2: {
            nb: 'Går du på arbeidsavklaringspenger eller mottar uføretrygd, og utdanningen din mangler? Da anbefaler vi at du tar kontakt med veilederen din via aktivitetsplanen og ber om at den registreres. Du kan fortsatt søke nå, men det tar lengre tid for oss å behandle din søknad hvis vi må kontakte veilederen din for deg.',
        },
        del3: {
            nb: [
                'Hvis du skal søke støtte i forbindelse med en utdanning som ble avsluttet for over 3 måneder siden, må du ',
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

export const utdanningTekster: AktivitetInnhold = {
    tittel: { nb: 'Utdanning eller opplæring' },
    guide_innhold: {
        nb: [
            'For å få støtte til læremidler må du ta en utdannelse eller opplæring godkjent av Nav.',
            'Vi viser utdanninger registrert på deg de siste 6 månedene.',
        ],
    },
    hvilken_aktivitet: hvilkenAktivitet,
    ingen_registrerte_aktiviterer_overskrift: {
        nb: 'Vi fant dessverre ingen arbeidsrettede aktiviteter som er registrert på deg.',
    },
    checkbox_velge_aktivitet_feilmelding: {
        nb: 'Du må svare på hvilken utdanning eller opplæring du søker om støtte i forbindelse med.',
    },
    radio_annen_utdanning: {
        header: {
            nb: 'Hva slags utdanning eller opplæring skal du ta?',
        },
        beskrivelse: {
            nb: 'Utdanningen må godkjennes og avtales med veileder.',
        },
        alternativer: AnnenUtdanningTypeTilTekst,
    },
    radio_annen_utdanning_feilmelding: {
        nb: 'Du må svare på hvilken utdanning du søker om støtte i forbindelse med.',
    },
    ingen_utdanning_alert_tittel: {
        nb: 'Hvis du ikke gjennomfører utdanning, har du ikke rett til støtte til læremidler',
    },
    ingen_utdanning_alert_innhold: {
        nb: 'Du kan fortsatt søke, men du kan få avslag.',
    },
    radio_mottar_har_funksjonsnedsettelse: {
        header: {
            nb: 'Har du særlig store utgifter til læremidler på grunn av en funksjonsnedsettelse?',
        },
        beskrivelse: {
            nb: 'Du må dokumentere din funksjonsnedsettelse med uttalelse fra helsepersonell. Alle utgiftene du ønsker å få dekket, må dokumenteres.',
        },
        alternativer: JaNeiTilTekst,
    },
    radio_lærling_etc: {
        header: {
            nb: 'Er du lærling, lærekandidat, praksisbrevkandidat eller kandidat for fagbrev på jobb?',
        },
        alternativer: JaNeiTilTekst,
    },
    radio_lærling_feilmelding: {
        nb: 'Du må svare på om du er lærling, lærekandidat, praksisbrevkandidat eller kandidat for fagbrev på jobb.',
    },
    les_mer_lærling_etc: {
        header: {
            nb: 'Hva betyr alternativene?',
        },
        innhold_lærling: {
            nb: [
                'Å være lærling betyr at du utdanner deg til et yrke ved å jobbe i en bedrift, hvor du får både opplæring og praksis i ett fag. ',
                {
                    tekst: 'Les mer om lærlinger på Vilbli.no',
                    url: 'https://www.vilbli.no/nb/no/a/laerling-6',
                    variant: 'neutral',
                },
                '.',
            ],
        },
        innhold_lærekandidatordningen: {
            nb: [
                'Lærekandidatordningen er et alternativ med færre kompetansemål for de som tror det kan bli vanskelig å fullføre et fag- eller svennebrev. ',
                {
                    tekst: 'Les mer om lærekandidatordningen på Vilbli.no',
                    url: 'https://www.vilbli.no/nb/no/a/laerekandidat-6',
                    variant: 'neutral',
                },
                '.',
            ],
        },
        innhold_praksisbrevkandidater: {
            nb: [
                'Praksisbrevkandidater går et toårig opplæringsløp på de yrkesfaglige utdanningsprogrammene. Det er en mer praktisk opplæring, hovedsakelig i bedrift. ',
                {
                    tekst: 'Les mer om praksisbrevkandidater på Vilbli.no',
                    url: 'https://www.vilbli.no/nb/no/a/praksisbrevkandidat-6',
                    variant: 'neutral',
                },
                '.',
            ],
        },
        innhold_fagbrev_på_jobb: {
            nb: [
                '«Fagbrev på jobb» er for de som er ufaglært og vil ta fagbrev samtidig som de er i lønnet arbeid. ',
                {
                    tekst: 'Les mer om fagbrev på jobb på Vilbli.no',
                    url: 'https://www.vilbli.no/nb/no/a/laerling-6',
                    variant: 'neutral',
                },
                '.',
            ],
        },
    },
    radio_mottar_har_funksjonsnedsettelse_feilmelding: {
        nb: 'Du må svare på om du har en funksjonsnedsettelse som fører til økte utgifter til læremidler.',
    },
};
