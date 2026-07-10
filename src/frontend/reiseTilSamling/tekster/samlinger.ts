import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { Radiogruppe, TekstElement } from '../../typer/tekst';

interface SamlingerInnhold {
    tittel: TekstElement<string>;
    guide_tekst: TekstElement<string>;
    info_minsteavstand: TekstElement<string>;
    startdato_label: TekstElement<string>;
    sluttdato_label: TekstElement<string>;
    vedlegg_alert_innhold: TekstElement<string>;
    knapp_legg_til: TekstElement<string>;
    knapp_slett: TekstElement<string>;
    feilmelding_startdato: TekstElement<string>;
    feilmelding_sluttdato: TekstElement<string>;
    feilmelding_sluttdato_før_startdato: TekstElement<string>;
    radio_samling_obligatorisk: Radiogruppe<JaNei>;
    radio_ekstra_reisedag: Radiogruppe<JaNei>;
    feilmelding_radio_samling_obligatorisk: TekstElement<string>;
    feilmelding_radio_ekstra_reisedag: TekstElement<string>;
    radio_brukSammeAdresseSomForrige: Radiogruppe<JaNei>;
    feilmelding_brukSammeAdresseSomForrige: TekstElement<string>;
    adresse_tittel: TekstElement<string>;
    velg_land_label: TekstElement<string>;
    gateadresse_label: TekstElement<string>;
    postnummer_label: TekstElement<string>;
    poststed_label: TekstElement<string>;
    antall_km_label: TekstElement<string>;
    antall_km_beskrivelse: TekstElement<string>;
    advarsel_antall_km_for_lav_tittel: TekstElement<string>;
    advarsel_antall_km_for_lav: TekstElement<string>;
    feilmelding_land: TekstElement<string>;
    feilmelding_gateadresse: TekstElement<string>;
    feilmelding_postnummer: TekstElement<string>;
    feilmelding_poststed: TekstElement<string>;
    feilmelding_antall_km: TekstElement<string>;
    feilmelding_antall_km_ugyldig: TekstElement<string>;
}

export const samlingerTekster: SamlingerInnhold = {
    tittel: {
        nb: 'Informasjon om samling',
    },
    guide_tekst: {
        nb: 'Velg «Legg til samling» nedenfor hvis du har deltatt eller skal delta på flere samlinger.',
    },
    info_minsteavstand: {
        nb: 'For at du skal få støtte, må det være minst 30 kilometer mellom hjemmet ditt og aktivitetsadressen.',
    },
    startdato_label: {
        nb: 'Startdato (dd.mm.åååå)',
    },
    sluttdato_label: {
        nb: 'Sluttdato (dd.mm.åååå)',
    },
    vedlegg_alert_innhold: {
        nb: 'Du må legge ved bekreftelse på samlingen. Du får instruksjoner om innsending av vedlegg senere i søknaden.',
    },
    knapp_legg_til: {
        nb: 'Legg til samling',
    },
    knapp_slett: {
        nb: 'Fjern samling',
    },
    feilmelding_startdato: {
        nb: 'Du må fylle inn startdato.',
    },
    feilmelding_sluttdato: {
        nb: 'Du må fylle inn sluttdato.',
    },
    feilmelding_sluttdato_før_startdato: {
        nb: 'Sluttdato kan ikke være før startdato.',
    },
    radio_samling_obligatorisk: {
        header: {
            nb: 'Er samlingen obligatorisk?',
        },
        alternativer: JaNeiTilTekst,
        beskrivelse: {
            nb: 'Dersom samlingen ikke er obligatorisk har du ikke rett til støtte ved reise til samling. Du kan fortsatt søke, men du kan få avslag.',
        },
    },
    radio_ekstra_reisedag: {
        header: {
            nb: 'Benyttet du deg av en ekstra reisedag i forbindelse med samlingen?',
        },
        alternativer: JaNeiTilTekst,
        beskrivelse: {
            nb: 'Dersom du måtte bruke en ekstra dag, enten før eller etter samlingen, så ønsker vi å vite det. Du kan få dekket utgifter til reise og opphold for denne dagen.',
        },
    },
    feilmelding_radio_samling_obligatorisk: {
        nb: 'Du må velge om samlingen er obligatorisk eller ikke.',
    },
    feilmelding_radio_ekstra_reisedag: {
        nb: 'Du må velge om du har benyttet en ekstra reisedag eller ikke.',
    },
    radio_brukSammeAdresseSomForrige: {
        header: {
            nb: 'Er adressen den samme som forrige samling?',
        },
        alternativer: JaNeiTilTekst,
    },
    feilmelding_brukSammeAdresseSomForrige: {
        nb: 'Du må svare på om adressen er den samme som forrige samling.',
    },
    adresse_tittel: {
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
    antall_km_label: {
        nb: 'Hvor lang reisevei har du?',
    },
    antall_km_beskrivelse: {
        nb: 'Oppgi antall kilometer én vei.',
    },
    advarsel_antall_km_for_lav_tittel: {
        nb: 'Dersom avstanden er under 30 kilometer har du ikke rett på pengestøtte til reise til samling.',
    },
    advarsel_antall_km_for_lav: {
        nb: 'Du kan fortsatt søke, men du kan få avslag.',
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
    feilmelding_antall_km: {
        nb: 'Du må fylle inn antall kilometer.',
    },
    feilmelding_antall_km_ugyldig: {
        nb: 'Antall kilometer må være et positivt tall.',
    },
};
