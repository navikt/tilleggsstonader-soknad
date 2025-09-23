import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { Button, HStack, VStack } from '@navikt/ds-react';

import { KjørelisteSider, SideTilPath } from '../kjørelisteSider';

interface KjørelisteNavigasonsKnapperProps {
    nesteSide: KjørelisteSider;
    forrigeSide: KjørelisteSider;
}

export const KjørelisteNavigasjonsKnapper = ({
    nesteSide,
    forrigeSide,
}: KjørelisteNavigasonsKnapperProps) => {
    const navigate = useNavigate();
    return (
        <VStack gap={'2'}>
            <HStack gap={'2'}>
                <Button
                    variant={'secondary'}
                    icon={<ArrowLeftIcon />}
                    onClick={() => navigate(SideTilPath[forrigeSide])}
                >
                    Forrige steg
                </Button>
                <Button
                    variant={'primary'}
                    icon={<ArrowRightIcon />}
                    iconPosition={'right'}
                    onClick={() => navigate(SideTilPath[nesteSide])}
                >
                    Neste steg
                </Button>
            </HStack>
            <HStack>
                <Button variant={'tertiary'} onClick={() => navigate('/kjoreliste')}>
                    Avbryt utfylling
                </Button>
            </HStack>
        </VStack>
    );
};
