import { InlineLenke, Punktliste, TekstElement } from '../../typer/tekst';

// TODO: placeholder-tekster - dette er et skjelett og innholdet må erstattes med endelig tekst
interface ForsideInnhold {
    banner_tittel: TekstElement<string>;
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string>;
    for_du_soker_tittel: TekstElement<string>;
    for_du_soker_innhold: TekstElement<string[]>;

    utgifter_som_dekkes_tittel: TekstElement<string>;
    utgifter_som_dekkes_innhold: TekstElement<string[]>;

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
        nb: 'Du kan få dekket reiseutgifter mellom hjemstedet ditt og aktivitetsstedet når du må flytte for å delta på aktivitet. Du får dekket reiseutgifter til oppstart og avslutning av aktiviteten, og til hjemreiser.',
    },

    for_du_soker_tittel: {
        nb: 'Før du søker',
    },
    for_du_soker_innhold: {
        // TODO: placeholder - fyll ut endelig innhold
        nb: [
            'Du må dokumentere utgiftene dine i søknaden.',
            'Du må gi oss beskjed hvis situasjonen din endrer seg.',
            'Hvis du får penger du ikke har rett på, kan vi kreve dem tilbake.',
            'De fleste feltene i skjemaet er obligatoriske å fylle ut. Felt som ikke er obligatoriske er merket med: (valgfritt).',
        ],
    },
    utgifter_som_dekkes_tittel: {
        nb: 'Hvilke utgifter dekker vi?',
    },
    utgifter_som_dekkes_innhold: {
        nb: [
            'Du får vanligvis dekket inntil fire hjemreiser per år.',
            'Du får dekket den rimeligste reisemåten med kollektiv transport. Dersom du ikke kan reise kollektivt, kan du få godkjent bruk av egen bil.',
            'Du kan også få dekket reiseutgifter for barn under 18 år som reiser sammen med deg.',
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
