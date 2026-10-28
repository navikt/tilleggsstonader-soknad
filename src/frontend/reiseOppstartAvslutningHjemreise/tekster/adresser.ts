import { FregAdresseEllerManuellAdresseInnhold } from '../../components/FolkeregistrertAdresseInformasjon/tekster';
import { JaNeiTilTekst } from '../../tekster/felles';
import { Adresse, JaNei } from '../../typer/søknad';
import { Datoperiode, InputFelt, RadiogruppePåkrevd, TekstElement } from '../../typer/tekst';

interface AdresserInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
    radio_må_bo_borte_hjemmefra: RadiogruppePåkrevd<JaNei>;
    advarsel_må_bo_borte_hjemmefra: TekstElement<string>;
    dato_flytting: Datoperiode;
    original_adresse_tittel: TekstElement<string>;
    midlertidig_adresse_tittel: TekstElement<string>;
    midlertidig_adresse_spørsmål: Record<keyof Adresse, InputFelt>;
}

const adresseSpørsmålFelles: Record<keyof Adresse, InputFelt> = {
    land: {
        label: { nb: 'Velg land' },
        feilmelding: { nb: 'Du må velge land.' },
    },
    gateadresse: {
        label: { nb: 'Gateadresse' },
        feilmelding: { nb: 'Du må fylle inn gateadresse.' },
    },
    postnummer: {
        label: { nb: 'Postnummer' },
        feilmelding: { nb: 'Du må fylle inn postnummer.' },
    },
    poststed: {
        label: { nb: 'Poststed' },
        feilmelding: { nb: 'Du må fylle inn poststed.' },
    },
};

export const adresserTekster: AdresserInnhold = {
    tittel: { nb: 'Adresser' },
    guide_innhold: {
        nb: ['Vi trenger adressene du flyttet fra og flyttet til for å vurdere søknaden.'],
    },
    radio_må_bo_borte_hjemmefra: {
        header: {
            nb: 'Må du midlertidig bo borte hjemmefra for å delta på denne aktiviteten?',
        },
        alternativer: JaNeiTilTekst,
        feilmelding: {
            nb: 'Du må svare på om du må bo borte hjemmefra for å delta på aktiviteten.',
        },
    },
    advarsel_må_bo_borte_hjemmefra: {
        nb: 'Ut fra svarene dine ser det ut som du ikke må bo midlertidig borte hjemmefra på grunn av deltakelse på arbeidsrettet aktivitet. Da har du ikke rett på pengestøtte til reise ved oppstart, avslutning og hjemreiser. Du kan fortsatt søke, men det kan hende du får avslag.',
    },
    dato_flytting: {
        label: {
            nb: 'I hvilken periode må du midlertidig bo borte hjemmefra?',
        },
        fom: {
            nb: 'Fra dato',
        },
        tom: {
            nb: 'Til dato',
        },
        feilmelding_fom: {
            nb: 'Du må fylle ut fra dato.',
        },
        feilmelding_tom: {
            nb: 'Du må fylle ut til dato.',
        },
        feilmelding_tom_før_fom: {
            nb: 'Til dato må være samme dag eller etter fra dato.',
        },
    },
    original_adresse_tittel: {
        nb: 'Adressen du flyttet fra',
    },
    midlertidig_adresse_tittel: {
        nb: 'Adressen du midlertidig bor på',
    },
    midlertidig_adresse_spørsmål: adresseSpørsmålFelles,
};

export const fregAdresseEllerManuellAdresseTekster: FregAdresseEllerManuellAdresseInnhold = {
    bruk_folkeregistrert_adresse: {
        header: {
            nb: 'Er det den folkeregistrerte adressen du skal flytte fra?',
        },
        alternativer: JaNeiTilTekst,
        feilmelding: {
            nb: 'Du må svare på om folkeregistrert adresse er adressen du skal flytte fra.',
        },
    },
    manuell_adresse_tittel: { nb: 'Oppgi adressen du flyttet fra' },
    manuell_adresse: adresseSpørsmålFelles,
};
