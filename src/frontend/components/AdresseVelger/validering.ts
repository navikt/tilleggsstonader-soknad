import { Adresse } from '../../typer/søknad';
import { Locale, TekstElement } from '../../typer/tekst';
import { Valideringsfeil } from '../../typer/validering';
import { harVerdi } from '../../utils/typeUtils';

export type AdresseFeilmeldingTekster = Record<
    keyof Adresse,
    { feilmelding: TekstElement<string> }
>;

export type AdresseFeilIder = Record<keyof Adresse, string>;

export const validerAdresse = (
    adresse: Adresse | undefined,
    locale: Locale,
    feilmeldinger: AdresseFeilmeldingTekster,
    feilIder: AdresseFeilIder
): Valideringsfeil => {
    const feil: Valideringsfeil = {};

    if (!harVerdi(adresse?.land?.verdi)) {
        feil[feilIder.land] = {
            id: feilIder.land,
            melding: feilmeldinger.land.feilmelding[locale],
        };
    }
    if (!harVerdi(adresse?.gateadresse?.verdi)) {
        feil[feilIder.gateadresse] = {
            id: feilIder.gateadresse,
            melding: feilmeldinger.gateadresse.feilmelding[locale],
        };
    }
    if (!harVerdi(adresse?.postnummer?.verdi)) {
        feil[feilIder.postnummer] = {
            id: feilIder.postnummer,
            melding: feilmeldinger.postnummer.feilmelding[locale],
        };
    }
    if (!harVerdi(adresse?.poststed?.verdi)) {
        feil[feilIder.poststed] = {
            id: feilIder.poststed,
            melding: feilmeldinger.poststed.feilmelding[locale],
        };
    }

    return feil;
};
