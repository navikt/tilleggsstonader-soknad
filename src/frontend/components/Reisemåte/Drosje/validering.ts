import { Reisemåte } from '../../../typer/reisemåte';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { harVerdi } from '../../../utils/typeUtils';
import { DrosjeTekster } from '../tekster';

export const errorKeyHarTTKort = (reiseId: number) => `reise_${reiseId}_reisemåte_har_tt_kort`;

export const nullstillteDrosjefeil = (reiseId: number): Valideringsfeil => ({
    [errorKeyHarTTKort(reiseId)]: undefined,
});

export const validerDrosje = (
    reisemåte: Reisemåte | undefined,
    locale: Locale,
    reiseId: number,
    tekster: DrosjeTekster
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    const drosje = reisemåte?.drosje;

    const harHelsemessigÅrsakSomUnntak =
        reisemåte?.unntakFraOffentligTransport?.årsaker?.verdier.some(
            (felt) => felt.verdi === 'HELSEMESSIGE_ÅRSAKER'
        );

    if (harHelsemessigÅrsakSomUnntak) {
        if (!harVerdi(drosje?.harTTKort?.verdi)) {
            feil = {
                ...feil,
                [errorKeyHarTTKort(reiseId)]: {
                    id: errorKeyHarTTKort(reiseId),
                    melding: tekster.radio_har_du_tt_kort.feilmelding[locale],
                },
            };
        }
    }

    return feil;
};
