import { Dispatch, SetStateAction } from 'react';

import { InlineMessage, VStack } from '@navikt/ds-react';

import { errorKeyTotalutgifterOffentligTransport } from './validering';
import { LocaleTextField } from '../../../../components/Teksthåndtering/LocaleTextField';
import { useSpråk } from '../../../../context/SpråkContext';
import { useValideringsfeil } from '../../../../context/ValideringsfeilContext';
import { reisemåteTekster } from '../../../tekster/reisemåte';
import { OffentligTransportInfo, Reisemåte } from '../../../typer/reisemåte';

export const OffentligTransportReiseTilSamling: React.FC<{
    offentligTransport: OffentligTransportInfo | undefined;
    settReisemåte: Dispatch<SetStateAction<Reisemåte | undefined>>;
}> = ({ offentligTransport, settReisemåte }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const oppdaterTotalUtgifterOffentligTransport = (verdi: string) => {
        settReisemåte((prev) => ({
            ...prev,
            offentligTransport: {
                ...prev?.offentligTransport,
                totalUtgifterOffentligTransport: {
                    label: reisemåteTekster.totalutgifter_offentlig_transport.label[locale],
                    verdi,
                },
            },
        }));

        settValideringsfeil((prev) => ({
            ...prev,
            [errorKeyTotalutgifterOffentligTransport]: undefined,
        }));
    };

    return (
        <VStack gap="space-16">
            <LocaleTextField
                id={valideringsfeil[errorKeyTotalutgifterOffentligTransport]?.id}
                tekst={reisemåteTekster.totalutgifter_offentlig_transport}
                inputMode="numeric"
                value={offentligTransport?.totalUtgifterOffentligTransport?.verdi ?? ''}
                error={valideringsfeil[errorKeyTotalutgifterOffentligTransport]?.melding}
                onChange={(e) => oppdaterTotalUtgifterOffentligTransport(e.target.value)}
                htmlSize={6} // TODO se over størrelsen her
            />
            <InlineMessage status="info">
                {reisemåteTekster.kan_reise_offentlig_info[locale]}
            </InlineMessage>
        </VStack>
    );
};
