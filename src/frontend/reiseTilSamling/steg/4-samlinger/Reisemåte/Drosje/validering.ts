import { Locale } from '../../../../../typer/tekst';
import { Valideringsfeil } from '../../../../../typer/validering';
import { harVerdi } from '../../../../../utils/typeUtils';
import { reisemåteTekster } from '../../../../tekster/reisemåte';
import { Reisemåte } from '../../../../typer/reisemåte';

export const errorKeyHarTTKort = 'reisemåte_har_tt_kort';

export const nullstillteDrosjefeil: Valideringsfeil = {
    [errorKeyHarTTKort]: undefined,
};

export const validerDrosje = (
    reisemåte: Reisemåte | undefined,
    locale: Locale
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
                [errorKeyHarTTKort]: {
                    id: errorKeyHarTTKort,
                    melding: reisemåteTekster.radio_har_du_tt_kort.feilmelding[locale],
                },
            };
        }
    }

    return feil;
};
