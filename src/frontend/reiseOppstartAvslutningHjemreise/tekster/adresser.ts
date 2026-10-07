import { JaNeiTilTekst } from '../../tekster/felles';
import { Adresse, JaNei } from '../../typer/søknad';
import { Datoperiode, InputFelt, RadiogruppePåkrevd, TekstElement } from '../../typer/tekst';

interface AdresserInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
    radio_må_bo_borte_hjemmefra: RadiogruppePåkrevd<JaNei>;
    advarsel_må_bo_borte_hjemmefra: TekstElement<string>;
    folkereg_adresse: TekstElement<string>;
    folkereg_adresse_info: TekstElement<string>;
    folkereg_adresse_lenke_tekst: TekstElement<string>;
    folkereg_adresse_lenke_url: string;
    dato_flytting: Datoperiode;
    radio_samme_som_flyttet_fra: RadiogruppePåkrevd<JaNei>;
    fallback_ingen_strukturert_adresse: TekstElement<string>;
    original_adresse_tittel: TekstElement<string>;
    midlertidig_adresse_tittel: TekstElement<string>;
    original_adresse_spørsmål: Record<keyof Adresse, InputFelt>;
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
        nb: [
            'Vi trenger adressene du flyttet fra og flyttet til for å vurdere søknaden.',
            'Svar først på om du må bo midlertidig borte hjemmefra.',
        ],
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
    folkereg_adresse: {
        nb: 'Din folkeregistrerte adresse er [0].',
    },
    folkereg_adresse_info: {
        nb: 'Adressen er hentet fra Folkeregisteret. Det er viktig at denne adressen er korrekt. Du kan ',
    },
    folkereg_adresse_lenke_tekst: {
        nb: 'endre adressen på Skatteetatens nettsider (åpnes i ny fane)',
    },
    folkereg_adresse_lenke_url: 'https://www.skatteetaten.no/person/folkeregister/endre/',
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
    radio_samme_som_flyttet_fra: {
        header: {
            nb: 'Er det den folkeregistrerte adressen du skal flytte fra?',
        },
        alternativer: JaNeiTilTekst,
        feilmelding: {
            nb: 'Du må svare på om folkeregistrert adresse er adressen du skal flytte fra.',
        },
    },
    fallback_ingen_strukturert_adresse: {
        nb: 'Vi mangler strukturert folkeregistrert adresse. Du må derfor fylle inn adressen du flyttet fra manuelt.',
    },
    original_adresse_tittel: {
        nb: 'Adressen du flyttet fra',
    },
    midlertidig_adresse_tittel: {
        nb: 'Adressen du midlertidig bor på',
    },
    original_adresse_spørsmål: adresseSpørsmålFelles,
    midlertidig_adresse_spørsmål: adresseSpørsmålFelles,
};
