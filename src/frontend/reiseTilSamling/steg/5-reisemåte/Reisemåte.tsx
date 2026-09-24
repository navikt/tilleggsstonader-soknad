import { VStack } from '@navikt/ds-react';

import { DrosjeReiseTilSamling } from './Drosje/DrosjeReiseTilSamling';
import { OffentligTransportReiseTilSamling } from './OffentligTransport/OffentligTransportReiseTilSamling';
import { PrivatBilReiseTilSamling } from './PrivatBil/PrivatBilReiseTilSamling';
import { TransportmiddelOgUnntak } from './TransportmiddelOgUnntak';
import { useReiseTilSamlingSøknad } from '../../context/ReiseTilSamlingSøknadContext';

export const Reisemåte = () => {
    const { reisemåte, settReisemåte } = useReiseTilSamlingSøknad();

    const transportmidlerHuketAv =
        reisemåte?.hvilkeTransportmidlerBleBenyttet?.verdier.map((v) => v.verdi) ?? [];

    const offentligTransportHuketAv = transportmidlerHuketAv.includes('OFFENTLIG_TRANSPORT');
    const privatBilHuketAv = transportmidlerHuketAv.includes('PRIVAT_BIL');
    const drosjeHuketAv = transportmidlerHuketAv.includes('DROSJE');

    return (
        <VStack gap="space-40">
            <TransportmiddelOgUnntak />

            {offentligTransportHuketAv && (
                <OffentligTransportReiseTilSamling
                    offentligTransport={reisemåte?.offentligTransport}
                    settReisemåte={settReisemåte}
                />
            )}

            {privatBilHuketAv && (
                <PrivatBilReiseTilSamling
                    privatBil={reisemåte?.privatBil}
                    settReisemåte={settReisemåte}
                />
            )}
            {drosjeHuketAv && (
                <DrosjeReiseTilSamling
                    unntakFraPrivatBil={reisemåte?.unntakFraPrivatBil}
                    drosje={reisemåte?.drosje}
                    settReisemåte={settReisemåte}
                />
            )}
        </VStack>
    );
};
