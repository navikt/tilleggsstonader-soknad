import { TekstElement, InlineLenke, Punktliste } from '../../typer/tekst';

interface ForsideInnhold {
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
    viktig_å_vite_tittel: TekstElement<string>;
    viktig_å_vite_innhold: TekstElement<(string | InlineLenke)[]>;
    mengde_støtte_tittel: TekstElement<string>;
    mengde_støtte_innhold1: TekstElement<InlineLenke>;
    mengde_støtte_innhold2: TekstElement<string>;
    info_som_hentes_tittel: TekstElement<string>;
    info_som_hentes_punktlister: Punktliste[];
    info_som_hentes_personvern: TekstElement<InlineLenke>;
}

export const forsideTekster: ForsideInnhold = {
    veileder_tittel: {
        nb: 'Hei [0]!',
    },
    veileder_innhold: {
        nb: [
            'Denne pengestøtten kan gis til deg som går på utdanning eller opplæring godkjent av Nav, og er enslig mor/far, gjenlevende, mottar AAP, uføretrygd, sykepenger eller har nedsatt arbeidsevne.',
        ],
    },
    viktig_å_vite_tittel: {
        nb: 'Viktig å vite før du søker',
    },
    viktig_å_vite_innhold: {
        nb: [
            [
                'Denne pengestøtten dekker ikke eksamensgebyr, semesteravgift eller skolepenger. Du må fylle ut andre skjemaer for å søke om dette, avhengig om du har ',
                {
                    tekst: 'nedsatt arbeidsevne',
                    url: 'https://www.nav.no/fyllut/nav760710',
                    variant: 'neutral',
                },
                ', er ',
                {
                    tekst: 'enslig mor/far',
                    url: 'https://www.nav.no/start/soknad-skolepenger-enslig',
                    variant: 'neutral',
                },
                ', eller ',
                {
                    tekst: 'gjenlevende',
                    url: 'https://www.nav.no/fyllut/nav170901?sub=paper',
                    variant: 'neutral',
                },
                '.',
            ],
            'Du må gi beskjed til oss hvis situasjonen din endrer seg, f.eks. hvis du avbryter opplæringen eller utdanningen.',
            'Hvis du får utgiftene til læremidler dekket på annen måte (f.eks. utstyrsstipend fra Lånekassa eller gjennom kursavgiften) har du mest sannsynlig ikke rett til denne pengestøtten.',
            'De fleste feltene i skjemaet er obligatoriske å fylle ut. Felt som ikke er obligatoriske er merket med: (valgfritt).',
        ],
    },
    mengde_støtte_tittel: {
        nb: 'Hvor mye kan du få i pengestøtte?',
    },
    mengde_støtte_innhold1: {
        nb: [
            'Det er ',
            {
                tekst: 'faste satser',
                url: 'https://www.nav.no/satser#tilleggsstonader',
                variant: 'neutral',
            },
            ' som bestemmer hvor mye du kan få i pengestøtte. Satsene er ulike avhengig av om du studerer deltid eller heltid, og nivået på opplæringen din.',
        ],
    },
    mengde_støtte_innhold2: {
        nb: 'Hvis du har særlig store utgifter grunnet funksjonsnedsettelse, kan du søke om å få dekket de faktiske utgiftene dine. Du må dokumentere din funksjonsnedsettelse med uttalelse fra helsepersonell og utgiftene dine med faktura eller kvittering.',
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
                    'adressen din fra Folkeregisteret',
                    'informasjon om utdanning eller opplæring avtalt med veileder i Nav',
                    'hvilke andre andre ytelser du mottar fra Nav',
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
            'Nav er ansvarlig for å behandle personopplysningene dine. Vi deler ikke informasjonen du gir oss i søknaden med noen andre.  ',
            {
                tekst: 'Personvernerklæringen på nav.no',
                url: 'https://www.nav.no/personvernerklaering',
                variant: 'neutral',
            },
            ' (åpnes i ny fane) gir mer informasjon om hvordan vi behandler dine personopplysninger.',
        ],
    },
};
