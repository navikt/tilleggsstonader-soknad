import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

interface AvreiseadresseInnhold {
    tittel: TekstElement<string>;
    folkereg_adresse: TekstElement<string>;
    radio_skalReiseFraFolkeregAdr: Radiogruppe<JaNei>;
    avreiseadresse_fra_folkereg_info: TekstElement<string>;
    avreiseadresse_fra_folkereg_lenke_tekst: TekstElement<string>;
    avreiseadresse_fra_folkereg_lenke_url: string;
    avreiseadresse_tittel: TekstElement<string>;
    avreiseadresse_vegadresse_label: TekstElement<string>;
    avreiseadresse_postnummer_label: TekstElement<string>;
    avreiseadresse_poststed_label: TekstElement<string>;
    velg_land_label: TekstElement<string>;
    feilmelding_skalReiseFraFolkeregAdr: TekstElement<string>;
    feilmelding_avreise_land: TekstElement<string>;
    feilmelding_avreise_gateadresse: TekstElement<string>;
    feilmelding_avreise_postnummer: TekstElement<string>;
    feilmelding_avreise_poststed: TekstElement<string>;
}

export const avreiseadresseTekster: AvreiseadresseInnhold = {
    tittel: {
        nb: 'Avreiseadresse',
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
    velg_land_label: {
        nb: 'Velg land',
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
};
