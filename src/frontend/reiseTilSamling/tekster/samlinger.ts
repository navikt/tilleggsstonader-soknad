import { JaNeiTilTekst } from '../../tekster/felles';
import { Adresse, JaNei } from '../../typer/søknad';
import { Datoperiode, InputFelt, RadiogruppePåkrevd, TekstElement } from '../../typer/tekst';

interface SamlingerInnhold {
    tittel: TekstElement<string>;
    guide_tekst: TekstElement<string>;
    dato: Datoperiode;
    knapp_legg_til: TekstElement<string>;
    knapp_slett: TekstElement<string>;
    radio_samling_obligatorisk: RadiogruppePåkrevd<JaNei>;
    samling_obligatorisk_alert_dokumentasjon: TekstElement<string>;
    samling_obligatorisk_alert_ikke_rett: TekstElement<string>;
    radio_brukSammeAdresseSomForrige: RadiogruppePåkrevd<JaNei>;
    adresse_tittel: TekstElement<string>;
    adresse_spørsmål: Record<keyof Adresse, InputFelt>;
    antall_km: InputFelt & {
        feilmelding_ugyldig: TekstElement<string>;
        beskrivelse: TekstElement<string>;
    };
    advarsel_antall_km_for_lav: TekstElement<string>;
}

export const samlingerTekster: SamlingerInnhold = {
    tittel: {
        nb: 'Din reise',
    },
    guide_tekst: {
        nb: 'Oppgi informasjon om reisen din. Du må ha gjennomført reisen for å få den innvilget.  Hvis du har reist til flere samlinger kan disse legges til med knappen “Legg til reise”.  Du kan søke for reiser gjennomført inntil 6 måneder tilbake i tid.',
    },
    dato: {
        label: { nb: 'Dato for samling' },
        fom: { nb: 'Fra og med (dd.mm.åååå)' },
        description_fom: { nb: 'Vi kan ikke innvilge reiser som ikke er gjennomført' },
        tom: { nb: 'Til og med (dd.mm.åååå)' },
        feilmelding_fom: { nb: 'Du må fylle inn startdato.' },
        feilmelding_tom: { nb: 'Du må fylle inn sluttdato.' },
        feilmelding_tom_før_fom: { nb: 'Sluttdato kan ikke være før startdato.' },
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
        feilmelding: { nb: 'Du må velge om samlingen er obligatorisk eller ikke.' },
    },
    samling_obligatorisk_alert_dokumentasjon: {
        nb: 'Du må legge ved bekreftelse på at samlingen er obligatorisk. Du får instruksjoner om innsending av vedlegg senere i søknaden.',
    },
    samling_obligatorisk_alert_ikke_rett: {
        nb: 'Samlingen må være obligatorisk for å ha rett til denne pengestøtten. Du kan søke om pengestøtte til reise til samling, men vil mest sannsynlig få avslag.',
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
    adresse_spørsmål: {
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
    },
    antall_km: {
        label: { nb: 'Hvor lang reisevei har du?' },
        beskrivelse: { nb: 'Angi antall kilometer mellom bostedet ditt og samlingsstedet.' },
        feilmelding: { nb: 'Du må fylle inn antall kilometer.' },
        feilmelding_ugyldig: { nb: 'Antall kilometer må være større enn 0.' },
    },
    advarsel_antall_km_for_lav: {
        nb: 'Reiseavstanden må være minst 30 kilometer for å ha rett til denne pengestøtten. Du kan søke om pengestøtte til reise til samling, men vil mest sannsynlig få avslag.',
    },
};
