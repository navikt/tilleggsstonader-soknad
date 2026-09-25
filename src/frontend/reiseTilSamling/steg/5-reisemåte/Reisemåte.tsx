import { VStack } from '@navikt/ds-react';

import { DrosjeReiseTilSamling } from './Drosje/DrosjeReiseTilSamling';
import { OffentligTransportReiseTilSamling } from './OffentligTransport/OffentligTransportReiseTilSamling';
import { PrivatBilReiseTilSamling } from './PrivatBil/PrivatBilReiseTilSamling';
import { TransportmiddelOgUnntak } from './TransportmiddelOgUnntak';
import { finnValgteTransportmidler } from './transportmiddelUtils';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';

export const Reisemåte = () => {
    const { reisemåte, settReisemåte } = useReiseTilSamlingSøknad();
    const transportmidlerHuketAv = finnValgteTransportmidler(
        reisemåte?.hvilkeTransportmidlerBleBenyttet
    );

    return (
        <VStack gap="space-40">
            <TransportmiddelOgUnntak />

            {transportmidlerHuketAv.includes('OFFENTLIG_TRANSPORT') && (
                <OffentligTransportReiseTilSamling
                    offentligTransport={reisemåte?.offentligTransport}
                    settReisemåte={settReisemåte}
                />
            )}

            {transportmidlerHuketAv.includes('PRIVAT_BIL') && (
                <PrivatBilReiseTilSamling
                    privatBil={reisemåte?.privatBil}
                    settReisemåte={settReisemåte}
                />
            )}
            {transportmidlerHuketAv.includes('DROSJE') && (
                <DrosjeReiseTilSamling
                    unntakFraPrivatBil={reisemåte?.unntakFraPrivatBil}
                    drosje={reisemåte?.drosje}
                    settReisemåte={settReisemåte}
                />
            )}
        </VStack>
    );
};
