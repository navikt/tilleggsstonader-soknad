import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { aktivitetTekster } from '../../tekster/aktivitet';

export const feilValgtAktivitet = (feil: Valideringsfeil, locale: Locale) => ({
    ...feil,
    valgteAktiviteter: {
        id: '1',
        melding: aktivitetTekster.checkbox_velge_aktivitet_feilmelding[locale],
    },
});

export const feilLønnetAktivitet = (feil: Valideringsfeil, locale: Locale) => ({
    ...feil,
    lønnetAktivitet: {
        id: '2',
        melding: aktivitetTekster.radio_lønnet_tiltak_feilmelding[locale],
    },
});

export const feilAnnenAktivitet = (feil: Valideringsfeil, locale: Locale) => ({
    ...feil,
    annenAktivitet: {
        id: '3',
        melding: aktivitetTekster.radio_annet_feilmelding[locale],
    },
});
