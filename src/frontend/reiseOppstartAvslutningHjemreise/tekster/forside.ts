import { InlineLenke, Punktliste, TekstElement } from '../../typer/tekst';

interface ForsideInnhold {
    banner_tittel: TekstElement<string>;
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
    dette_ma_du_vite_tittel: TekstElement<string>;
    dette_ma_du_vite_innhold: TekstElement<string[]>;
    var_klar_over_tittel: TekstElement<string>;
    var_klar_over_innhold: TekstElement<string[]>;
    kan_ikke_soke_tittel: TekstElement<string>;
    kan_ikke_soke_innhold: TekstElement<(string | InlineLenke)[]>;

    info_som_hentes_tittel: TekstElement<string>;
    info_som_hentes_innhold: Punktliste[];
    info_som_hentes_personvern: TekstElement<InlineLenke>;
}

export const forsideTekster: ForsideInnhold = {
    banner_tittel: {
        nb: 'Søknad om støtte til reise ved oppstart, avslutning og hjemreise',
    },
    veileder_tittel: {
        nb: 'Hei!',
    },
    veileder_innhold: {
        nb: [
            'Her kan du søke om pengestøtte til reise ved oppstart, avslutning og hjemreise, for å dekke reiseutgifter mellom hjemstedet ditt og aktivitetsstedet når du midlertidig må bo borte for å delta på arbeidsrettet tiltak eller utdanning/opplæring godkjent av Nav.',
        ],
    },
    dette_ma_du_vite_tittel: {
        nb: 'Dette må du vite',
    },
    dette_ma_du_vite_innhold: {
        nb: [
            'Pengestøtten kan gis til deg som gjennomfører en arbeidsrettet aktivitet og er enslig mor/far, gjenlevende, har nedsatt arbeidsevne, mottar arbeidsavklaringspenger (AAP), uføretrygd, aktivitetspenger for unge, tiltakspenger, dagpenger, kvalifiseringsstønad eller sitter i fengsel og ellers ville hatt rett til tiltakspenger.',
            'Du får som hovedregel dekket den billigste reisemåten med offentlig transport. Hvis det ikke er praktisk mulig å bruke offentlig transport, kan du få dekket nødvendige utgifter til annen reisemåte.',
            'Du kan få dekket reiseutgifter til oppstart, avslutning og hjemreiser, og får vanligvis dekket inntil 4 hjemreiser tur/retur per år.',
            'Du kan få dekket utgifter til flere hjemreiser hvis du har barn som ennå ikke har fullført 4. skoleår og blir igjen på hjemstedet, eller ved særlige grunner som for eksempel helsemessige årsaker.',
            'Du kan få dekket reiseutgifter for barn under 18 år som flytter sammen med deg.',
            'Du får støtten utbetalt i etterkant, basert på innsendt dokumentasjon som for eksempel kvitteringer på reiseutgifter.',
        ],
    },
    var_klar_over_tittel: {
        nb: 'Vær klar over',
    },
    var_klar_over_innhold: {
        nb: [
            'Du må gi oss beskjed hvis situasjonen din endrer seg, for eksempel hvis du avbryter tiltaket eller utdanningen.',
            'Hvis du får penger du ikke har rett på, kan vi kreve dem tilbake.',
            'Hvis din arbeidsrettede aktivitet varer i flere år, må du sende ny søknad for hvert år.',
        ],
    },
    kan_ikke_soke_tittel: {
        nb: 'Du kan ikke bruke denne søknaden hvis',
    },
    kan_ikke_soke_innhold: {
        nb: [
            'Du er under 18 år',
            'Du søker på vegne av andre',
            [
                'Du søker støtte for en aktivitet som ble avsluttet for mer enn 6 måneder siden. Da må du fylle ut ',
                {
                    tekst: 'dette skjemaet i stedet',
                    url: 'https://www.nav.no/fyllut/nav111218b?sub=paper',
                },
                ' (åpnes i ny fane).',
            ],
        ],
    },
    info_som_hentes_tittel: {
        nb: 'Informasjon vi henter om deg',
    },
    info_som_hentes_innhold: [
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
