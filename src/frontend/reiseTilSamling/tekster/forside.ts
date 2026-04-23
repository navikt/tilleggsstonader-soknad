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
        nb: 'Du kan få denne støtten hvis du:',
    },
    veileder_innhold_punkter: {
        nb: ['deltar i et arbeidsrettet tiltak eller tar utdanning som Nav har godkjent'],
    },
    veileder_innhold_mellomtekst: {
        nb: 'og i tillegg er du',
    },
    veileder_innhold_fortsettelse_punkter: {
        nb: [
            'enslig mor eller far',
            'gjenlevende',
            'mottaker av arbeidsavklaringspenger (AAP)',
            'mottaker av uføretrygd',
            'person med nedsatt arbeidsevne',
            'mottaker av tiltakspenger',
            'mottaker av dagpenger',
            'mottaker av kvalifiseringsstønad',
            'innsatt i fengsel og deltar i et arbeidsrettet tiltak',
        ],
    },
    kan_soke_tittel: {
        nb: 'Du kan søke om',
    },
    kan_soke_innhold: {
        nb: [
            'å få dekket nødvendige reiseutgifter til og fra en samling i forbindelse med et arbeidsrettet tiltak.',
            'Samlingen må være obligatorisk.',
            'Reiseavstanden må være minst 30 km.',
            'Vi dekker den billigste reisemåten.',
        ],
    },
    kan_ikke_soke_tittel: {
        nb: 'Du kan ikke bruke denne søknaden hvis',
    },
    kan_ikke_soke_tekst: {
        nb: [
            'du er under 18 år, søker på vegne av andre eller søker støtte for en aktivitet som ble avsluttet for mer enn 3 måneder siden. Da må du fylle ut ',
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
            'Du må vite adressen til samlingen. Du skal oppgi hvor du reiser til i søknaden.',
            'Du må dokumentere at samlingen er obligatorisk.',
            'Du må legge ved dokumentasjon på reisen, for eksempel tog- eller flybilletter og andre kvitteringer. Bruker du egen bil, kan du dokumentere utgifter til bom og ferge.',
            'Du må gi oss beskjed hvis situasjonen din endrer seg, for eksempel hvis du avbryter tiltaket eller utdanningen.',
            'Hvis du får penger du ikke har rett på, kan vi kreve dem tilbake.',
        ],
    },
    var_klar_over_tittel: {
        nb: 'Vær klar over',
    },
    var_klar_over_innhold: {
        nb: [
            'Du får støtten utbetalt i etterkant, basert på kvitteringene du sender inn.',
            'Hvis tiltaket varer i flere år, må du sende en ny søknad for hvert år.',
            'De fleste feltene i skjemaet må du fylle ut. Felt som ikke er påkrevde, er merket med (valgfritt).',
            'Bruker du en offentlig PC, for eksempel på biblioteket, må du lukke nettleseren når du er ferdig. Da hindrer du at andre får tilgang til opplysningene du har skrevet inn.',
        ],
    },
    info_som_hentes_tittel: {
        nb: 'Informasjon vi henter om deg',
    },
    info_som_hentes_punktlister: [
        {
            tittel: {
                nb: 'I tillegg til opplysningene du gir i søknaden, henter vi:',
            },
            innhold: {
                nb: [
                    'person- og adresseopplysninger fra Folkeregisteret',
                    'opplysninger om utdanning eller tiltak du har avtalt med veilederen din i Nav',
                    'opplysninger om andre ytelser du får fra Nav',
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
            'Nav har ansvar for å behandle personopplysningene dine. Vi deler ikke opplysningene i søknaden med andre. ',
            {
                tekst: 'Les personvernerklæringen på nav.no',
                url: 'https://www.nav.no/personvernerklaering',
            },
            ' for å få mer informasjon om hvordan vi behandler personopplysningene dine.',
        ],
    },
};
