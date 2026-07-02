import {
    AktivitetInnhold,
    aktivitetTeksterFelles,
    AktivitetTypeUtdanningTilTekst,
    plukkAktivitetTekster,
    tekstArbeidsrettedeAktiviteter,
} from '../../tekster/aktivitet';
import { JaNeiTilTekst } from '../../tekster/felles';
import { AktivitetTypeUtdanning, AnnenAktivitetType } from '../../typer/aktivitet';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

interface AktivitetInnholdDagligAktivitet extends AktivitetInnhold {
    radio_type_arbeidsrettede_aktiviteter: Radiogruppe<AktivitetTypeUtdanning>;
    radio_type_arbeidsrettede_aktiviteter_feilmelding: TekstElement<string>;
    radio_type_arbeidsrettede_aktiviteter_lesmer: {
        header: TekstElement<string>;
        innhold: TekstElement<string>[];
    };
    radio_ikke_kvalifisert_tittel: TekstElement<string>;
    radio_dekket_reise: Radiogruppe<JaNei>;
    radio_dekket_reise_feilmelding: TekstElement<string>;
    radio_dekket_reise_alert_content: TekstElement<string>;
    radio_under_25_år: Radiogruppe<JaNei>;
    radio_under_25_år_feilmelding: TekstElement<string>;
    radio_under_25_år_alert_content: TekstElement<string>;
    radio_må_betale_for_reise_til_skole: Radiogruppe<JaNei>;
    radio_må_betale_for_reise_til_skole_feilmelding: TekstElement<string>;
    radio_må_betale_for_reise_til_skole_alert_content: TekstElement<string>;
    radio_opplæring_for_voksne_alert_content: TekstElement<string>;
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

export const AktivitetTypeTilTekstReiseTilSamling = plukkAktivitetTekster(
    AnnenAktivitetType.TILTAK,
    AnnenAktivitetType.UTDANNING,
    AnnenAktivitetType.INGEN_AKTIVITET
);

export const aktivitetTekster: AktivitetInnholdDagligAktivitet = {
    ...aktivitetTeksterFelles,
    hvilken_aktivitet: {
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
    },

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
    radio_annet_uten_registeraktivitet_feilmelding: {
        nb: 'Du må velge en aktivitet',
    },
    radio_type_arbeidsrettede_aktiviteter: {
        header: { nb: 'Hva slags type arbeidsrettet aktivitet går du du på?' },
        alternativer: AktivitetTypeUtdanningTilTekst,
    },
    radio_type_arbeidsrettede_aktiviteter_lesmer: {
        header: { nb: 'Hva betyr alternativene?' },
        innhold: [
            {
                nb: 'Hvis du søker om stønad for en aktivitet som ikke er videregående skole eller forberedende opplæring for voksne, skal du velge svaralternativet annen arbeidsrettet aktivitet med mål om arbeid eller utdanning.',
            },
            {
                nb: 'Videregående skole (VGS) er den delen av videregående opplæring som foregår i skole. Den har tre videregående trinn (i noen spesialtilfeller fire). For yrkesfaglig utdanning foregår deler av utdanningen i bedrift, som oftest to år i lære i en bedrift etter to år i videregående skole.',
            },
            {
                nb: 'Forberedende opplæring for voksne (FOV) er et tilbud for personer over 16 år som trenger grunnleggende opplæring på nivået under videregående skole. Dette inkluderer hele fag, deler av fag eller opplæring i grunnleggende ferdigheter som lesing, skriving, norsk muntlig, regning og digitale ferdigheter.',
            },
        ],
    },
    radio_type_arbeidsrettede_aktiviteter_feilmelding: {
        nb: 'Du må svare på hva slags type arbeidsrettet aktivitet du går på.',
    },
    radio_dekket_reise: {
        header: { nb: 'Får du dekket reisen til aktivitetsstedet av arbeidsgiveren din?' },
        alternativer: JaNeiTilTekst,
    },
    radio_dekket_reise_feilmelding: {
        nb: 'Du må svare på om du får dekket reisen til aktivitetsstedet av arbeidsgiveren din.',
    },
    radio_ikke_kvalifisert_tittel: {
        nb: 'Du er ikke kvalifisert for å motta støtten',
    },
    radio_dekket_reise_alert_content: {
        nb: 'Siden du får dekket kostnader for daglig reise av arbeidsgiveren, er ikke du kvalifisert for å motta denne stønaden. Du kan fortsatt søke - men du vil mest sannsynlig få avslag.',
    },
    radio_under_25_år: {
        header: { nb: 'Er/var du under 25 år det kalenderåret skoleåret starter?' },
        alternativer: JaNeiTilTekst,
    },
    radio_under_25_år_feilmelding: {
        nb: 'Du må svare på om du var under 25 år det kalenderåret skoleåret startet.',
    },
    radio_under_25_år_alert_content: {
        nb: 'Vi tror du har rett til gratis skoleskyss fordi du går på videregående skole og ikke fyller 25 år i kalenderåret skoleåret starter. Da har du ikke rett til pengestøtte til daglige reiser. Hvis du likevel må betale for reisen til skolen selv, må du bekrefte dette i spørsmålet under.',
    },
    radio_må_betale_for_reise_til_skole: {
        header: { nb: 'Må du betale for reisen til skolen selv?' },
        alternativer: JaNeiTilTekst,
    },
    radio_må_betale_for_reise_til_skole_feilmelding: {
        nb: 'Du må svare på om du må betale for reisen til skolen selv.',
    },
    radio_må_betale_for_reise_til_skole_alert_content: {
        nb: 'Siden du ikke må betale for reisen til skolen selv, er ikke du kvalifisert for å motta denne stønaden. Du kan fortsatt søke - men du vil mest sannsynlig få avslag.',
    },
    radio_opplæring_for_voksne_alert_content: {
        nb: 'Siden du går på forberedende for opplæring voksne, skal kommunen dekke dine utgifter til skoleskyss hvis reiseavstanden er over 4 km. Du kan søke om pengestøtte til daglige reiser, men du vil mest sannsynlig få avslag.',
    },
};
