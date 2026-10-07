import { OffentligTransportInfo } from '../../../../../typer/reisemåte';
import { Locale } from '../../../../../typer/tekst';
import { Valideringsfeil } from '../../../../../typer/validering';
import { erGyldigKostnad } from '../../../../../utils/tall';
import { harVerdi } from '../../../../../utils/typeUtils';
import { reisemåteTekster } from '../../../../tekster/reisemåte';

export const errorKeyTotalutgifterOffentligTransport = (samlingId: number) =>
    `samling_${samlingId}_reisemåte_totalutgifter_offentlig_transport`;

export const nullstilteOffentligTransportFeil = (samlingId: number): Valideringsfeil => ({
    [errorKeyTotalutgifterOffentligTransport(samlingId)]: undefined,
});

export const validerOffentligTransport = (
    offentligTransport: OffentligTransportInfo | undefined,
    locale: Locale,
    samlingId: number
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    const utgifter = offentligTransport?.totalUtgifterOffentligTransport?.verdi;

    if (!harVerdi(utgifter)) {
        feil = {
            ...feil,
            [errorKeyTotalutgifterOffentligTransport(samlingId)]: {
                id: errorKeyTotalutgifterOffentligTransport(samlingId),
                melding: reisemåteTekster.totalutgifter_offentlig_transport.feilmelding[locale],
            },
        };
    } else if (!erGyldigKostnad(utgifter)) {
        feil = {
            ...feil,
            [errorKeyTotalutgifterOffentligTransport(samlingId)]: {
                id: errorKeyTotalutgifterOffentligTransport(samlingId),
                melding:
                    reisemåteTekster.totalutgifter_offentlig_transport.feilmelding_ugyldig[locale],
            },
        };
    }

    return feil;
};
