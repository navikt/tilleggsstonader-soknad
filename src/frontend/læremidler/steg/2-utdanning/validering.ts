import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';

export const feilValgtAktivitet = (feil: Valideringsfeil, locale: Locale) => ({
    ...feil,
    valgteAktiviteter: {
        id: '1',
        melding: utdanningTekster.checkbox_velge_aktivitet_feilmelding[locale],
    },
});

export const feilAnnenUtdanning = (feil: Valideringsfeil, locale: Locale) => ({
    ...feil,
    annenUtdanning: {
        id: '2',
        melding: utdanningTekster.radio_annen_utdanning_feilmelding[locale],
    },
});

export const feilErLærlingEllerLiknende = (feil: Valideringsfeil, locale: Locale) => ({
    ...feil,
    erLærlingEllerLiknende: {
        id: '3',
        melding: utdanningTekster.radio_lærling_feilmelding[locale],
    },
});

export const feilHarTidligereFullførtVgs = (feil: Valideringsfeil, locale: Locale) => ({
    ...feil,
    harTidligereFullførtVgs: {
        id: '4',
        melding: utdanningTekster.radio_har_fullført_vgs_feilmelding[locale],
    },
});

export const feilHarFunksjonsnedsettelse = (feil: Valideringsfeil, locale: Locale) => ({
    ...feil,
    harFunksjonsnedsettelse: {
        id: '5',
        melding: utdanningTekster.radio_mottar_har_funksjonsnedsettelse_feilmelding[locale],
    },
});
