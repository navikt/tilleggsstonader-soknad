import { Reisemåte } from '../../../../../typer/reisemåte';
import { Locale } from '../../../../../typer/tekst';
import { Valideringsfeil } from '../../../../../typer/validering';
import { harVerdi } from '../../../../../utils/typeUtils';
import { reisemåteTekster } from '../../../../tekster/reisemåte';

export const errorKeyHarTTKort = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_har_tt_kort`;

export const nullstillteDrosjefeil = (samlingId: number): Valideringsfeil => ({
    [errorKeyHarTTKort(samlingId)]: undefined,
});

export const validerDrosje = (
    reisemåte: Reisemåte | undefined,
    locale: Locale,
    samlingId: number
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
                [errorKeyHarTTKort(samlingId)]: {
                    id: errorKeyHarTTKort(samlingId),
                    melding: reisemåteTekster.radio_har_du_tt_kort.feilmelding[locale],
                },
            };
        }
    }

    return feil;
};
