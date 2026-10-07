import { Dispatch, SetStateAction } from 'react';

import { Heading, InlineMessage, VStack } from '@navikt/ds-react';

import { errorKeyTotalutgifterOffentligTransport } from './validering';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { reisemåteTekster } from '../../../reiseTilSamling/tekster/reisemåte';
import { OffentligTransportInfo, Reisemåte } from '../../../typer/reisemåte';
import { Skillelinje } from '../../Skillelinje';
import { LocaleTextField } from '../../Teksthåndtering/LocaleTextField';

export const OffentligTransportReiseTilSamling: React.FC<{
    samlingId: number;
    offentligTransport: OffentligTransportInfo | undefined;
    settReisemåte: Dispatch<SetStateAction<Reisemåte | undefined>>;
}> = ({ samlingId, offentligTransport, settReisemåte }) => {
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
            [errorKeyTotalutgifterOffentligTransport(samlingId)]: undefined,
        }));
    };

    return (
        <VStack gap="space-24">
            <Skillelinje />
            <Heading level="3" size="small">
                {reisemåteTekster.offentlig_transport_tittel[locale]}
            </Heading>
            <VStack gap="space-16">
                <LocaleTextField
                    id={valideringsfeil[errorKeyTotalutgifterOffentligTransport(samlingId)]?.id}
                    tekst={reisemåteTekster.totalutgifter_offentlig_transport}
                    inputMode="numeric"
                    value={offentligTransport?.totalUtgifterOffentligTransport?.verdi ?? ''}
                    error={
                        valideringsfeil[errorKeyTotalutgifterOffentligTransport(samlingId)]?.melding
                    }
                    onChange={(e) => oppdaterTotalUtgifterOffentligTransport(e.target.value)}
                    htmlSize={6} // TODO se over størrelsen her
                />
                <InlineMessage status="info">
                    {reisemåteTekster.kan_reise_offentlig_info[locale]}
                </InlineMessage>
            </VStack>
        </VStack>
    );
};
