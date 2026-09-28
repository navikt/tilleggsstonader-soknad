import { Locale } from '../../../../typer/tekst';
import { Valideringsfeil } from '../../../../typer/validering';
import { erGyldigKostnad } from '../../../../utils/tall';
import { harVerdi } from '../../../../utils/typeUtils';
import { reisemåteTekster } from '../../../tekster/reisemåte';
import { OffentligTransportInfo } from '../../../typer/reisemåte';

export const errorKeyTotalutgifterOffentligTransport =
    'reisemåte_totalutgifter_offentlig_transport';

export const nullstilteOffentligTransportFeil: Valideringsfeil = {
    [errorKeyTotalutgifterOffentligTransport]: undefined,
};

export const validerOffentligTransport = (
    offentligTransport: OffentligTransportInfo | undefined,
    locale: Locale
): Valideringsfeil => {
    let feil: Valideringsfeil = {};

    const utgifter = offentligTransport?.totalUtgifterOffentligTransport?.verdi;

    if (!harVerdi(utgifter)) {
        feil = {
            ...feil,
            [errorKeyTotalutgifterOffentligTransport]: {
                id: errorKeyTotalutgifterOffentligTransport,
                melding: reisemåteTekster.totalutgifter_offentlig_transport.feilmelding[locale],
            },
        };
    } else if (!erGyldigKostnad(utgifter)) {
        feil = {
            ...feil,
            [errorKeyTotalutgifterOffentligTransport]: {
                id: errorKeyTotalutgifterOffentligTransport,
                melding:
                    reisemåteTekster.totalutgifter_offentlig_transport.feilmelding_ugyldig[locale],
            },
        };
    }

    return feil;
};
