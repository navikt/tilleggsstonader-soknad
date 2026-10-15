import { InputFelt, RadiogruppePåkrevd, TekstElement, Datoperiode } from '../../typer/tekst';
import { TypeReise } from '../typer/søknad';

interface ReiseinfoInnhold {
    tittel: TekstElement<string>;
    guide_innhold: TekstElement<string[]>;
    knapp_legg_til: TekstElement<string>;
    knapp_slett: TekstElement<string>;
    radio_type_reise: RadiogruppePåkrevd<TypeReise>;
    dato_enkelt: InputFelt;
    dato_periode: Datoperiode;
}

export const reiseinfoTekster: ReiseinfoInnhold = {
    tittel: { nb: 'Reiseinformasjon' },
    guide_innhold: {
        nb: ['Vi trenger informasjon om reisen for å kunne vurdere søknaden din.'],
    },
    knapp_legg_til: { nb: 'Legg til reise' },
    knapp_slett: { nb: 'Fjern reise' },
    radio_type_reise: {
        header: { nb: 'Hvilken type reise søker du om?' },
        alternativer: {
            OPPSTART: { nb: 'Oppstart' },
            AVSLUTNING: { nb: 'Avslutning' },
            HJEMREISE: { nb: 'Hjemreise' },
        },
        feilmelding: { nb: 'Du må velge hvilken type reise du søker om.' },
    },
    dato_enkelt: {
        label: { nb: 'Reisedato (dd.mm.åååå)' },
        feilmelding: { nb: 'Du må fylle inn reisedato.' },
    },
    dato_periode: {
        label: { nb: 'Periode for reisen' },
        fom: { nb: 'Fra og med (dd.mm.åååå)' },
        tom: { nb: 'Til og med (dd.mm.åååå)' },
        feilmelding_fom: { nb: 'Du må fylle inn startdato.' },
        feilmelding_tom: { nb: 'Du må fylle inn sluttdato.' },
        feilmelding_tom_før_fom: { nb: 'Sluttdato kan ikke være før startdato.' },
    },
};
