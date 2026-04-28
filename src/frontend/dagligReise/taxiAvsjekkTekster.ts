import { LesMer, TekstElement } from '../typer/tekst';

export interface TaxiAvsjekkInnhold {
    banner_daglig_reise: TekstElement<string>;
    hvorfor_spør_vi: LesMer<string>;
    veileder_tittel: TekstElement<string>;
    veileder_innhold: TekstElement<string[]>;
}

export const taxiAvsjekkTekster: TaxiAvsjekkInnhold = {
    banner_daglig_reise: {
        nb: 'Søknad om støtte til daglige reiser',
    },
    hvorfor_spør_vi: {
        header: { nb: 'Hvorfor spør vi om dette?' },
        innhold: {
            nb: 'Vi trenger å vite om du skal reise med taxi for å kunne sende deg til riktig søknad.',
        },
    },
    veileder_tittel: {
        nb: 'Hei!',
    },
    veileder_innhold: {
        nb: [
            'Denne pengestøtten kan gis til deg som gjennomfører en arbeidsrettet aktivitet og er enslig mor/far, gjenlevende, mottar arbeidsavklaringspenger (AAP), uføretrygd, har nedsatt arbeidsevne, tiltakspenger, dagpenger, kvalifiseringsstønad eller sitter i fengsel og ellers ville hatt rett til tiltakspenger.',
        ],
    },
};
