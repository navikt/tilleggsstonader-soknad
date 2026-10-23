import { TekstElement } from '../../typer/tekst';

interface OppsummeringInnhold {
    tittel: TekstElement<string>;
    aktivitet_tittel: TekstElement<string>;
    adresser_tittel: TekstElement<string>;
    barn_og_særlige_behov_tittel: TekstElement<string>;
    reiseinfo_tittel: TekstElement<string>;
    original_adresse: TekstElement<string>;
    midlertidig_adresse: TekstElement<string>;
}

export const oppsummeringTekster: OppsummeringInnhold = {
    tittel: { nb: 'Oppsummering' },
    aktivitet_tittel: { nb: 'Aktivitet' },
    adresser_tittel: { nb: 'Adresser' },
    barn_og_særlige_behov_tittel: { nb: 'Barn og særlige behov' },
    original_adresse: { nb: 'Adressen du flyttet fra' },
    midlertidig_adresse: { nb: 'Adressen du flyttet til midlertidig' },
    reiseinfo_tittel: { nb: 'Reiseinformasjon' },
};
