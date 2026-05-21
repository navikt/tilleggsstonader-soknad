import { TekstElement } from '../../typer/tekst';

interface ReiseavstandInnhold {
    tittel: TekstElement<string>;
    info_minsteavstand: TekstElement<string>;
    antall_km_label: TekstElement<string>;
    antall_km_beskrivelse: TekstElement<string>;
    folkeregistrert_adresse_info: TekstElement<string>;
    folkeregistrert_adresse_lenke_tekst: TekstElement<string>;
    folkeregistrert_adresse_lenke_url: string;
    aktivitetsadresse_tittel: TekstElement<string>;
    velg_land_label: TekstElement<string>;
    gateadresse_label: TekstElement<string>;
    postnummer_label: TekstElement<string>;
    poststed_label: TekstElement<string>;
    feilmelding_antall_km: TekstElement<string>;
    feilmelding_antall_km_ugyldig: TekstElement<string>;
    feilmelding_land: TekstElement<string>;
    feilmelding_gateadresse: TekstElement<string>;
    feilmelding_postnummer: TekstElement<string>;
    feilmelding_poststed: TekstElement<string>;
}

export const reiseavstandTekster: ReiseavstandInnhold = {
    tittel: {
        nb: 'Reiseavstand',
    },
    info_minsteavstand: {
        nb: 'For at du skal få støtte, må det være minst 30 kilometer mellom hjemmet ditt og aktivitetsadressen.',
    },
    antall_km_label: {
        nb: 'Hvor lang reisevei har du?',
    },
    antall_km_beskrivelse: {
        nb: 'Oppgi antall kilometer én vei.',
    },
    folkeregistrert_adresse_info: {
        nb: 'Vi tar utgangspunkt i den folkeregisterte adressen din som hjemmeadresse. Du kan ',
    },
    folkeregistrert_adresse_lenke_tekst: {
        nb: 'se og endre adressen på Skatteetatens nettsider (åpnes i ny fane)',
    },
    folkeregistrert_adresse_lenke_url: 'https://www.skatteetaten.no/person/folkeregister/endre/',
    aktivitetsadresse_tittel: {
        nb: 'Oppgi adressen du skal reise til',
    },
    velg_land_label: {
        nb: 'Velg land',
    },
    gateadresse_label: {
        nb: 'Gateadresse',
    },
    postnummer_label: {
        nb: 'Postnummer',
    },
    poststed_label: {
        nb: 'Poststed',
    },
    feilmelding_antall_km: {
        nb: 'Du må fylle inn antall kilometer.',
    },
    feilmelding_antall_km_ugyldig: {
        nb: 'Antall kilometer må være et positivt tall.',
    },
    feilmelding_land: {
        nb: 'Du må velge land.',
    },
    feilmelding_gateadresse: {
        nb: 'Du må fylle inn gateadresse.',
    },
    feilmelding_postnummer: {
        nb: 'Du må fylle inn postnummer.',
    },
    feilmelding_poststed: {
        nb: 'Du må fylle inn poststed.',
    },
};
