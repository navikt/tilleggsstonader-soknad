import { reisemåteTekster } from '../../../reiseTilSamling/tekster/reisemåte';
import { OffentligTransportInfo } from '../../../typer/reisemåte';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { erGyldigKostnad } from '../../../utils/tall';
import { harVerdi } from '../../../utils/typeUtils';

export const errorKeyTotalutgifterOffentligTransport = (reiseId: number) =>
    `reise_${reiseId}_reisemåte_totalutgifter_offentlig_transport`;

export const nullstilteOffentligTransportFeil = (reiseId: number): Valideringsfeil => ({
    [errorKeyTotalutgifterOffentligTransport(reiseId)]: undefined,
});

export const validerOffentligTransport = (
    offentligTransport: OffentligTransportInfo | undefined,
    locale: Locale,
    reiseId: number
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    const utgifter = offentligTransport?.totalUtgifterOffentligTransport?.verdi;

    if (!harVerdi(utgifter)) {
        feil = {
            ...feil,
            [errorKeyTotalutgifterOffentligTransport(reiseId)]: {
                id: errorKeyTotalutgifterOffentligTransport(reiseId),
                melding: reisemåteTekster.totalutgifter_offentlig_transport.feilmelding[locale],
            },
        };
    } else if (!erGyldigKostnad(utgifter)) {
        feil = {
            ...feil,
            [errorKeyTotalutgifterOffentligTransport(reiseId)]: {
                id: errorKeyTotalutgifterOffentligTransport(reiseId),
                melding:
                    reisemåteTekster.totalutgifter_offentlig_transport.feilmelding_ugyldig[locale],
            },
        };
    }

    return feil;
};
