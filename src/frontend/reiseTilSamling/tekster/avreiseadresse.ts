import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { InputFelt, RadiogruppePåkrevd, TekstElement } from '../../typer/tekst';

interface AvreiseadresseInnhold {
    tittel: TekstElement<string>;
    folkereg_adresse: TekstElement<string>;
    radio_skalReiseFraFolkeregAdr: RadiogruppePåkrevd<JaNei>;
    avreiseadresse_fra_folkereg_info: TekstElement<string>;
    avreiseadresse_fra_folkereg_lenke_tekst: TekstElement<string>;
    avreiseadresse_fra_folkereg_lenke_url: string;
    avreiseadresse_tittel: TekstElement<string>;
    avreiseadresse_vegadresse: InputFelt;
    avreiseadresse_postnummer: InputFelt;
    avreiseadresse_poststed: InputFelt;
    velg_land: InputFelt;
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
        feilmelding: {
            nb: 'Du må svare på om du skal reise fra din folkeregistrerte adresse.',
        },
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
    avreiseadresse_vegadresse: {
        label: { nb: 'Gateadresse' },
        feilmelding: { nb: 'Du må fylle inn gateadresse.' },
    },
    avreiseadresse_postnummer: {
        label: { nb: 'Postnummer' },
        feilmelding: { nb: 'Du må fylle inn postnummer.' },
    },
    avreiseadresse_poststed: {
        label: { nb: 'Poststed' },
        feilmelding: { nb: 'Du må fylle inn poststed.' },
    },
    velg_land: {
        label: { nb: 'Velg land' },
        feilmelding: { nb: 'Du må velge land.' },
    },
};
