import { Dispatch, SetStateAction } from 'react';

import { VStack } from '@navikt/ds-react';

import { DrosjeReiseTilSamling } from './Drosje/DrosjeReiseTilSamling';
import { OffentligTransportReiseTilSamling } from './OffentligTransport/OffentligTransportReiseTilSamling';
import { PrivatBilReiseTilSamling } from './PrivatBil/PrivatBilReiseTilSamling';
import { ReisemåteTekstInnhold } from './tekster';
import { TransportmiddelOgUnntak } from './TransportmiddelOgUnntak';
import { finnValgteTransportmidler } from './transportmiddelUtils';
import { Reisemåte as ReisemåteType } from '../../typer/reisemåte';

export const Reisemåte: React.FC<{
    samlingId: number;
    reisemåte: ReisemåteType | undefined;
    settReisemåte: Dispatch<SetStateAction<ReisemåteType | undefined>>;
    tekster: ReisemåteTekstInnhold;
}> = ({ samlingId, reisemåte, settReisemåte, tekster }) => {
    const transportmidlerHuketAv = finnValgteTransportmidler(
        reisemåte?.hvilkeTransportmidlerBleBenyttet
    );

    return (
        <VStack gap="space-40">
            <TransportmiddelOgUnntak
                samlingId={samlingId}
                reisemåte={reisemåte}
                settReisemåte={settReisemåte}
                tekster={tekster.transportmiddelOgUnntak}
                unntakFraOffentligTransportTekster={tekster.unntakFraOffentligTransport}
            />

            {transportmidlerHuketAv.includes('OFFENTLIG_TRANSPORT') && (
                <OffentligTransportReiseTilSamling
                    samlingId={samlingId}
                    offentligTransport={reisemåte?.offentligTransport}
                    settReisemåte={settReisemåte}
                    tekster={tekster.offentligTransport}
                />
            )}

            {transportmidlerHuketAv.includes('PRIVAT_BIL') && (
                <PrivatBilReiseTilSamling
                    samlingId={samlingId}
                    privatBil={reisemåte?.privatBil}
                    settReisemåte={settReisemåte}
                    valgteTransportmidler={transportmidlerHuketAv}
                    tekster={tekster.privatBil}
                />
            )}
            {transportmidlerHuketAv.includes('DROSJE') && (
                <DrosjeReiseTilSamling
                    samlingId={samlingId}
                    unntakFraPrivatBil={reisemåte?.unntakFraPrivatBil}
                    drosje={reisemåte?.drosje}
                    settReisemåte={settReisemåte}
                    unntakFraOffentligTransport={reisemåte?.unntakFraOffentligTransport?.årsaker}
                    tekster={tekster.drosje}
                />
            )}
        </VStack>
    );
};
