import { Valideringsfeil } from '../../typer/validering';

export const feilValgtAktivitet = (feil: Valideringsfeil, feilmelding: string) => ({
    ...feil,
    valgteAktiviteter: {
        id: '1',
        melding: feilmelding,
    },
});

export const feilLønnetAktivitet = (feil: Valideringsfeil, feilmelding: string) => ({
    ...feil,
    lønnetAktivitet: {
        id: '2',
        melding: feilmelding,
    },
});

export const feilAnnenAktivitet = (feil: Valideringsfeil, feilmelding: string) => ({
    ...feil,
    annenAktivitet: {
        id: '3',
        melding: feilmelding,
    },
});

export const feilTilleggsopplysningerAnnenAktivitet = (
    feil: Valideringsfeil,
    feilmelding: string
) => ({
    ...feil,
    tilleggsopplysningerAnnenAktivitet: {
        id: '4',
        melding: feilmelding,
    },
});
