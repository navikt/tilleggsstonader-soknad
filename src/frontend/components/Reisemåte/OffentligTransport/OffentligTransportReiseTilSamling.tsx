import { Dispatch, SetStateAction } from 'react';

import { Heading, InlineMessage, VStack } from '@navikt/ds-react';

import { errorKeyTotalutgifterOffentligTransport } from './validering';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { OffentligTransportInfo, Reisemåte } from '../../../typer/reisemåte';
import { Skillelinje } from '../../Skillelinje';
import { LocaleTextField } from '../../Teksthåndtering/LocaleTextField';
import { OffentligTransportTekster } from '../tekster';

export const OffentligTransportReiseTilSamling: React.FC<{
    samlingId: number;
    offentligTransport: OffentligTransportInfo | undefined;
    settReisemåte: Dispatch<SetStateAction<Reisemåte | undefined>>;
    tekster: OffentligTransportTekster;
}> = ({ samlingId, offentligTransport, settReisemåte, tekster }) => {
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const tekstTotalutgifter = tekster.totalutgifter_offentlig_transport;

    const oppdaterTotalUtgifterOffentligTransport = (verdi: string) => {
        settReisemåte((prev) => ({
            ...prev,
            offentligTransport: {
                ...prev?.offentligTransport,
                totalUtgifterOffentligTransport: {
                    label: tekstTotalutgifter.label[locale],
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
                {tekster.offentlig_transport_tittel[locale]}
            </Heading>
            <VStack gap="space-16">
                <LocaleTextField
                    id={valideringsfeil[errorKeyTotalutgifterOffentligTransport(samlingId)]?.id}
                    tekst={tekstTotalutgifter}
                    inputMode="numeric"
                    value={offentligTransport?.totalUtgifterOffentligTransport?.verdi ?? ''}
                    error={
                        valideringsfeil[errorKeyTotalutgifterOffentligTransport(samlingId)]?.melding
                    }
                    onChange={(e) => oppdaterTotalUtgifterOffentligTransport(e.target.value)}
                    htmlSize={6} // TODO se over størrelsen her
                />
                <InlineMessage status="info">
                    {tekster.kan_reise_offentlig_info[locale]}
                </InlineMessage>
            </VStack>
        </VStack>
    );
};
