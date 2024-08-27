import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { utdanningTekster } from '../../tekster/utdanning';

export const feilAnnenUtdanning = (feil: Valideringsfeil, locale: Locale) => ({
    ...feil,
    annenUtdanning: {
        id: '1', // TODO: Oppdater når vi hentet utdanning
        melding: utdanningTekster.radio_annen_utdanning_feilmelding[locale],
    },
});

export const feilMottarUtstyrsstipend = (feil: Valideringsfeil, locale: Locale) => ({
    ...feil,
    annenUtdanning: {
        id: '2', // TODO: Oppdater når vi hentet utdanning
        melding: utdanningTekster.radio_mottar_utstyrsstipend_feilmelding[locale],
    },
});

export const feilHarFunksjonsnedsettelse = (feil: Valideringsfeil, locale: Locale) => ({
    ...feil,
    HarFunksjonsnedsettelse: {
        id: '3', // TODO: Oppdater når vi hentet utdanning
        melding: utdanningTekster.radio_mottar_har_funksjonsnedsettelse_feilmelding[locale],
    },
});
