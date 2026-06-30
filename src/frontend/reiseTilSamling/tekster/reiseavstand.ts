import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

interface ReiseavstandInnhold {
    tittel: TekstElement<string>;
    info_minsteavstand: TekstElement<string>;
    folkereg_adresse: TekstElement<string>;
    radio_skalReiseFraFolkeregAdr: Radiogruppe<JaNei>;
    avreiseadresse_fra_folkereg_info: TekstElement<string>;
    avreiseadresse_fra_folkereg_lenke_tekst: TekstElement<string>;
    avreiseadresse_fra_folkereg_lenke_url: string;
    avreiseadresse_tittel: TekstElement<string>;
    avreiseadresse_vegadresse_label: TekstElement<string>;
    avreiseadresse_postnummer_label: TekstElement<string>;
    avreiseadresse_poststed_label: TekstElement<string>;
    antall_km_label: TekstElement<string>;
    antall_km_beskrivelse: TekstElement<string>;
    aktivitetsadresse_tittel: TekstElement<string>;
    velg_land_label: TekstElement<string>;
    gateadresse_label: TekstElement<string>;
    postnummer_label: TekstElement<string>;
    poststed_label: TekstElement<string>;
    feilmelding_skalReiseFraFolkeregAdr: TekstElement<string>;
    feilmelding_avreise_land: TekstElement<string>;
    feilmelding_avreise_gateadresse: TekstElement<string>;
    feilmelding_avreise_postnummer: TekstElement<string>;
    feilmelding_avreise_poststed: TekstElement<string>;
    feilmelding_antall_km: TekstElement<string>;
    feilmelding_antall_km_ugyldig: TekstElement<string>;
    advarsel_antall_km_for_lav_tittel: TekstElement<string>;
    advarsel_antall_km_for_lav: TekstElement<string>;
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
    folkereg_adresse: {
        nb: 'Din folkeregistrerte adresse er [0].',
    },
    radio_skalReiseFraFolkeregAdr: {
        header: {
            nb: 'Skal du reise fra din folkeregistrerte adresse?',
        },
        alternativer: JaNeiTilTekst,
    },
    avreiseadresse_fra_folkereg_info: {
        nb: 'Adressen er hentet fra Folkeregisteret. Det er viktig at denne adressen er korrekt. Du kan ',
    },
    avreiseadresse_fra_folkereg_lenke_tekst: {
        nb: 'endre adressen på Skatteetatens nettsider (åpnes i ny fane)',
    },
    avreiseadresse_fra_folkereg_lenke_url:
        'https://www.skatteetaten.no/person/folkeregister/endre/',
    avreiseadresse_tittel: {
        nb: 'Oppgi adressen du skal reise fra',
    },
    avreiseadresse_vegadresse_label: {
        nb: 'Gateadresse',
    },
    avreiseadresse_postnummer_label: {
        nb: 'Postnummer',
    },
    avreiseadresse_poststed_label: {
        nb: 'Poststed',
    },
    antall_km_label: {
        nb: 'Hvor lang reisevei har du?',
    },
    antall_km_beskrivelse: {
        nb: 'Oppgi antall kilometer én vei.',
    },
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
    feilmelding_skalReiseFraFolkeregAdr: {
        nb: 'Du må svare på om du skal reise fra din folkeregistrerte adresse.',
    },
    feilmelding_avreise_land: {
        nb: 'Du må velge land.',
    },
    feilmelding_avreise_gateadresse: {
        nb: 'Du må fylle inn gateadresse.',
    },
    feilmelding_avreise_postnummer: {
        nb: 'Du må fylle inn postnummer.',
    },
    feilmelding_avreise_poststed: {
        nb: 'Du må fylle inn poststed.',
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
    advarsel_antall_km_for_lav: {
        nb: 'Du kan fortsatt søke, men du kan få avslag.',
    },
    advarsel_antall_km_for_lav_tittel: {
        nb: 'Dersom avstanden er under 30 kilometer har du ikke rett på pengestøtte til reise til samling.',
    },
};
