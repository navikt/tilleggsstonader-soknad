import { ReisemåteTekstInnhold } from '../../components/Reisemåte/tekster';
import { reisemåteTekster as reisemåteTeksterReiseTilSamling } from '../../reiseTilSamling/tekster/reisemåte';
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
    reisemåte: ReisemåteTekstInnhold;
}

export const reiseinfoTekster: ReiseinfoInnhold = {
    tittel: { nb: 'Reiseinformasjon' },
    guide_innhold: {
        nb: [
            'Oppgi informasjon om reisen din, og benytt deg av billigste reisemåte med offentlig transport som buss, tog, fly og lignende. Hvis du har gjennomført flere reiser kan disse legges til med knappen “Legg til reise”. ',
        ],
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
    // TODO: Implementer egne tekster for reiseOppstartAvslutningHjemreise på reisemåte
    reisemåte: {
        ...reisemåteTeksterReiseTilSamling,
        offentligTransport: {
            ...reisemåteTeksterReiseTilSamling.offentligTransport,
            totalutgifter_offentlig_transport: {
                ...reisemåteTeksterReiseTilSamling.offentligTransport
                    .totalutgifter_offentlig_transport,
                label: { nb: 'Hva er totalutgiftene til offentlig transport for denne reisen?' },
                beskrivelse: { nb: 'Oppgi totalbeløpet i kroner for reisen du registrerer nå.' },
            },
        },
    },
};
