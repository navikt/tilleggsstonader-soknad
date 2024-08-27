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
