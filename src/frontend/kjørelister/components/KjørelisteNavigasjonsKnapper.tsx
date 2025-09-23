import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { Button, HStack, VStack } from '@navikt/ds-react';

import { RouteKjørelste, RouteTilPath } from '../routesKjørelistes';

interface KjørelisteNavigasonsKnapperProps {
    nesteRoute: RouteKjørelste;
    forrigeRoute: RouteKjørelste;
}

export const KjørelisteNavigasjonsKnapper = ({
    nesteRoute,
    forrigeRoute,
}: KjørelisteNavigasonsKnapperProps) => {
    const navigate = useNavigate();
    return (
        <VStack gap={'2'}>
            <HStack gap={'2'}>
                <Button
                    variant={'secondary'}
                    icon={<ArrowLeftIcon />}
                    onClick={() => navigate(RouteTilPath[forrigeRoute])}
                >
                    Forrige steg
                </Button>
                <Button
                    variant={'primary'}
                    icon={<ArrowRightIcon />}
                    iconPosition={'right'}
                    onClick={() => navigate(RouteTilPath[nesteRoute])}
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
