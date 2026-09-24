import { Locale } from '../../../../typer/tekst';
import { Valideringsfeil } from '../../../../typer/validering';
import { harVerdi } from '../../../../utils/typeUtils';
import { reisemåteTekster } from '../../../tekster/reisemåte';
import { Reisemåte } from '../../../typer/reisemåte';

export const errorKeyØnskerDekketUtgifterForDrosje = 'reisemåte_ønsker_dekket_utgifter_for_drosje';
export const errorKeyHarTTKort = 'reisemåte_har_tt_kort';

export const nullstillteDrosjefeil: Valideringsfeil = {
    [errorKeyØnskerDekketUtgifterForDrosje]: undefined,
    [errorKeyHarTTKort]: undefined,
};

export const validerDrosje = (
    reisemåte: Reisemåte | undefined,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    const drosje = reisemåte?.drosje;

    if (!harVerdi(drosje?.ønskerDekketUtgifterForDrosje?.verdi)) {
        feil = {
            ...feil,
            [errorKeyØnskerDekketUtgifterForDrosje]: {
                id: errorKeyØnskerDekketUtgifterForDrosje,
                melding:
                    reisemåteTekster.radio_ønsker_dekket_utgifter_for_drosje.feilmelding[locale],
            },
        };
    }

    const harHelsemessigÅrsakSomUnntak =
        reisemåte?.unntakFraOffentligTransport?.årsaker?.verdier.some(
            (felt) => (felt.verdi = 'HELSEMESSIGE_ÅRSAKER')
        );

    if (drosje?.ønskerDekketUtgifterForDrosje?.verdi === 'JA' && harHelsemessigÅrsakSomUnntak) {
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
