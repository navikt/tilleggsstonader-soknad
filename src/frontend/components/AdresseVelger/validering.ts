import { Adresse } from '../../typer/søknad';
import { Locale, TekstElement } from '../../typer/tekst';
import { Feilmelding, Valideringsfeil } from '../../typer/validering';
import { harVerdi } from '../../utils/typeUtils';

export type AdresseValideringsfeil = Partial<Record<keyof Adresse, Feilmelding>>;

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
): AdresseValideringsfeil => {
    const feil: AdresseValideringsfeil = {};

    if (!harVerdi(adresse?.land?.verdi)) {
        feil.land = { id: feilIder.land, melding: feilmeldinger.land.feilmelding[locale] };
    }
    if (!harVerdi(adresse?.gateadresse?.verdi)) {
        feil.gateadresse = {
            id: feilIder.gateadresse,
            melding: feilmeldinger.gateadresse.feilmelding[locale],
        };
    }
    if (!harVerdi(adresse?.postnummer?.verdi)) {
        feil.postnummer = {
            id: feilIder.postnummer,
            melding: feilmeldinger.postnummer.feilmelding[locale],
        };
    }
    if (!harVerdi(adresse?.poststed?.verdi)) {
        feil.poststed = {
            id: feilIder.poststed,
            melding: feilmeldinger.poststed.feilmelding[locale],
        };
    }

    return feil;
};

export const adresseValideringsfeilTilValideringsfeil = (
    feil: AdresseValideringsfeil
): Valideringsfeil =>
    (Object.keys(feil) as Array<keyof Adresse>).reduce((acc, feltNavn) => {
        const feilmelding = feil[feltNavn];
        if (!feilmelding) {
            return acc;
        }
        return { ...acc, [feilmelding.id]: feilmelding };
    }, {} as Valideringsfeil);
