import { InlineLenke, Punktliste, TekstElement } from '../../typer/tekst';

interface ForsideInnhold {
    banner_tittel: TekstElement<string>;
    veileder_tittel: TekstElement<string>;
    veileder_innhold_tittel: TekstElement<string>;
    veileder_innhold_punkter: TekstElement<string[]>;
    veileder_innhold_mellomtekst: TekstElement<string>;
    veileder_innhold_fortsettelse_punkter: TekstElement<string[]>;
    kan_soke_tittel: TekstElement<string>;
    kan_soke_innhold: TekstElement<string[]>;
    kan_ikke_soke_tittel: TekstElement<string>;
    kan_ikke_soke_tekst: TekstElement<InlineLenke>;
    for_du_soker_tittel: TekstElement<string>;
    for_du_soker_innhold: TekstElement<string[]>;
    var_klar_over_tittel: TekstElement<string>;
    var_klar_over_innhold: TekstElement<string[]>;
    info_som_hentes_tittel: TekstElement<string>;
    info_som_hentes_punktlister: Punktliste[];
    info_som_hentes_personvern: TekstElement<InlineLenke>;
}

export const forsideTekster: ForsideInnhold = {
    banner_tittel: {
        nb: 'Søknad om støtte ved reise til samling',
    },
    veileder_tittel: {
        nb: 'Hei!',
    },
    veileder_innhold_tittel: {
        nb: 'Denne pengestøtten kan gis til deg som:',
    },
    veileder_innhold_punkter: {
        nb: ['deltar på et arbeidsrettet tiltak eller utdanning godkjent av Nav'],
    },
    veileder_innhold_mellomtekst: {
        nb: 'og samtidig er',
    },
    veileder_innhold_fortsettelse_punkter: {
        nb: [
            'enslig mor/far, gjenlevende, mottar arbeidsavklaringspenger (AAP), uføretrygd, har nedsatt arbeidsevne, tiltakspenger, dagpenger, kvalifiseringsstønad eller sitter i fengsel mens du deltar i arbeidsrettet tiltak.',
        ],
    },
    kan_soke_tittel: {
        nb: 'Her kan du søke om',
    },
    kan_soke_innhold: {
        nb: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        ],
    },
    kan_ikke_soke_tittel: {
        nb: 'Dette kan du ikke søke om her',
    },
    kan_ikke_soke_tekst: {
        nb: [
            'Hvis du er under 18 år, skal søke på vegne av andre og/eller skal søke pengestøtte for en aktivitet som ble avsluttet for mer enn 3 måneder siden, må du sende inn søknad på papir og fylle ut ',
            {
                tekst: 'dette skjemaet i stedet',
                url: 'https://www.nav.no/fyllut/nav111217b?sub=paper',
            },
            ' (åpnes i ny fane).',
        ],
    },
    for_du_soker_tittel: {
        nb: 'Før du søker',
    },
    for_du_soker_innhold: {
        nb: [
            'Du må vite adressen du skal møte opp på, da du må skrive den inn i søknaden.',
            'Hvis du søker om å få dekket reiseutgifter under 6 km av helsemessige årsaker, må du dokumentere dette med legeerklæring eller annen uttalelse fra helsepersonell.',
            'Du må gi beskjed til oss hvis situasjonen din endrer seg, for eksempel hvis du avbryter tiltaket eller utdanningen.',
            'Hvis du får penger du ikke har rett på, kan vi kreve at du betaler de tilbake.',
        ],
    },
    var_klar_over_tittel: {
        nb: 'Vær klar over',
    },
    var_klar_over_innhold: {
        nb: [
            'De fleste feltene i skjemaet er obligatoriske å fylle ut. Felt som ikke er obligatoriske er merket med: (valgfritt).',
            'Bruk av offentlig PC: Hvis du fyller ut skjemaet på en offentlig PC, for eksempel på et bibliotek, er det viktig at du lukker nettleseren når du er ferdig. Dette vil forhindre at uvedkommende får tak i opplysningene du har fylt ut i skjemaet.',
        ],
    },
    info_som_hentes_tittel: {
        nb: 'Informasjon vi henter om deg',
    },
    info_som_hentes_punktlister: [
        {
            tittel: {
                nb: 'I tillegg til den informasjonen du oppgir i søknaden, henter vi:',
            },
            innhold: {
                nb: [
                    'Person- og adresseinformasjon fra Folkeregisteret',
                    'Informasjon om utdanning eller tiltak avtalt med veileder i Nav',
                    'Hvilke andre ytelser du mottar fra Nav',
                ],
            },
        },
        {
            tittel: {
                nb: 'Ved behov sjekker vi:',
            },
            innhold: {
                nb: ['om du er medlem i folketrygden'],
            },
        },
    ],
    info_som_hentes_personvern: {
        nb: [
            'Nav er ansvarlig for å behandle personopplysningene dine. Vi deler ikke informasjonen du gir oss i søknaden med noen andre. ',
            {
                tekst: 'Personvernerklæringen på nav.no',
                url: 'https://www.nav.no/personvernerklaering',
            },
            ' gir mer informasjon om hvordan vi behandler personopplysningene dine.',
        ],
    },
};
