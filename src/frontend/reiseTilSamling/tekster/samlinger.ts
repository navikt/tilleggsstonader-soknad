import { JaNeiTilTekst } from '../../tekster/felles';
import { JaNei } from '../../typer/søknad';
import { Datoperiode, InputFelt, RadiogruppePåkrevd, TekstElement } from '../../typer/tekst';

interface SamlingerInnhold {
    tittel: TekstElement<string>;
    guide_tekst: TekstElement<string>;
    info_minsteavstand: TekstElement<string>;
    dato: Datoperiode;
    vedlegg_alert_innhold: TekstElement<string>;
    knapp_legg_til: TekstElement<string>;
    knapp_slett: TekstElement<string>;
    radio_samling_obligatorisk: RadiogruppePåkrevd<JaNei>;
    radio_ekstra_reisedag: RadiogruppePåkrevd<JaNei>;
    radio_brukSammeAdresseSomForrige: RadiogruppePåkrevd<JaNei>;
    adresse_tittel: TekstElement<string>;
    velg_land: InputFelt;
    gateadresse: InputFelt;
    postnummer: InputFelt;
    poststed: InputFelt;
    antall_km: InputFelt & {
        feilmelding_ugyldig: TekstElement<string>;
        beskrivelse: TekstElement<string>;
    };
    advarsel_antall_km_for_lav_tittel: TekstElement<string>;
    advarsel_antall_km_for_lav: TekstElement<string>;
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
    dato: {
        label: { nb: 'Dato for samling' },
        fom: { nb: 'Startdato (dd.mm.åååå)' },
        tom: { nb: 'Sluttdato (dd.mm.åååå)' },
        feilmelding_fom: { nb: 'Du må fylle inn startdato.' },
        feilmelding_tom: { nb: 'Du må fylle inn sluttdato.' },
        feilmelding_tom_før_fom: { nb: 'Sluttdato kan ikke være før startdato.' },
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
    radio_samling_obligatorisk: {
        header: {
            nb: 'Er samlingen obligatorisk?',
        },
        alternativer: JaNeiTilTekst,
        beskrivelse: {
            nb: 'Dersom samlingen ikke er obligatorisk har du ikke rett til støtte ved reise til samling. Du kan fortsatt søke, men du kan få avslag.',
        },
        feilmelding: { nb: 'Du må velge om samlingen er obligatorisk eller ikke.' },
    },
    radio_ekstra_reisedag: {
        header: {
            nb: 'Benyttet du deg av en ekstra reisedag i forbindelse med samlingen?',
        },
        alternativer: JaNeiTilTekst,
        beskrivelse: {
            nb: 'Dersom du måtte bruke en ekstra dag, enten før eller etter samlingen, så ønsker vi å vite det. Du kan få dekket utgifter til reise og opphold for denne dagen.',
        },
        feilmelding: { nb: 'Du må velge om du har benyttet en ekstra reisedag eller ikke.' },
    },
    radio_brukSammeAdresseSomForrige: {
        header: {
            nb: 'Er adressen den samme som forrige samling?',
        },
        alternativer: JaNeiTilTekst,
        feilmelding: { nb: 'Du må svare på om adressen er den samme som forrige samling.' },
    },
    adresse_tittel: {
        nb: 'Oppgi adressen du skal reise til',
    },
    velg_land: {
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
    antall_km: {
        label: { nb: 'Hvor lang reisevei har du?' },
        beskrivelse: { nb: 'Angi antall kilometer mellom bostedet ditt og samlingsstedet.' },
        feilmelding: { nb: 'Du må fylle inn antall kilometer.' },
        feilmelding_ugyldig: { nb: 'Antall kilometer må være et positivt tall.' },
    },
    advarsel_antall_km_for_lav_tittel: {
        nb: 'Dersom avstanden er under 30 kilometer har du ikke rett på pengestøtte til reise til samling.',
    },
    advarsel_antall_km_for_lav: {
        nb: 'Du kan fortsatt søke, men du kan få avslag.',
    },
};
