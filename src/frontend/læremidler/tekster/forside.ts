import { TekstElement, InlineLenke } from '../../typer/tekst';

interface ForsideInnhold {
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
    viktig_å_vite_tittel: TekstElement<string>;
    viktig_å_vite_innhold: TekstElement<(string | InlineLenke)[]>;
    mengde_støtte_tittel: TekstElement<string>;
    mengde_støtte_innhold1: TekstElement<InlineLenke>;
    mengde_støtte_innhold2: TekstElement<string>;
    info_som_hentes_tittel: TekstElement<string>;
    info_som_hentes_innhold1: TekstElement<string>;
    info_som_hentes_innhold2: TekstElement<string[]>;
    info_som_hentes_innhold3: TekstElement<string>;
    info_som_hentes_innhold4: TekstElement<string[]>;
    info_som_hentes_innhold5: TekstElement<InlineLenke>;
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
                'Denne stønaden dekker ikke semesteravgift eller skolepenger. Du må fylle ut andre skjemaer for å søke om dette, avhengig om du har ',
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
            'Hvis du får utgiftene dine dekket på annen måte (f.eks. utstyrsstipend fra Lånekassa) har du mest sannsynlig ikke rett til denne stønaden.',
        ],
    },
    mengde_støtte_tittel: {
        nb: 'Hvor mye kan du få i støtte?',
    },
    mengde_støtte_innhold1: {
        nb: [
            'Det er ',
            {
                tekst: 'faste satser ',
                url: 'https://www.nav.no/tilleggsstonader#hva',
                variant: 'neutral',
            },
            'som bestemmer hvor mye du kan få i støtte. Satsene er ulike avhengig av om du studerer deltid eller heltid, og nivået på opplæringen din.',
        ],
    },
    mengde_støtte_innhold2: {
        nb: 'Hvis du har særlig store utgifter grunnet funksjonsnedsettelse kan du få dekket faktiske utgiftene dine. Du må dokumentere din funksjonsnedsettelse med uttalelse fra helsepersonell og utgiftene dine med faktura eller kvittering.',
    },
    info_som_hentes_tittel: {
        nb: 'Informasjon vi henter om deg',
    },
    info_som_hentes_innhold1: {
        nb: 'I tillegg til den informasjonen du oppgir i søknaden, henter vi:',
    },
    info_som_hentes_innhold2: {
        nb: [
            'adressen din og opplysninger om dine barn fra Folkeregisteret',
            'informasjon om utdanning eller opplæring avtalt med veileder i Nav',
            'hvilke andre andre ytelser du mottar fra Nav',
        ],
    },
    info_som_hentes_innhold3: {
        nb: 'Ved behov sjekker vi:',
    },
    info_som_hentes_innhold4: {
        nb: ['om du er medlem i folketrygden'],
    },
    info_som_hentes_innhold5: {
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
