import React from 'react';

import { useNavigate } from 'react-router-dom';

import { BodyLong, Button, Heading, VStack } from '@navikt/ds-react';

import { Container } from '../components/Side';
import { reiseTilSamlingPath } from './routing/routesReiseTilSamling';

export const NesteStegPlaceholder: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <VStack gap="space-16">
                <Heading size="large" level="1">
                    Dette er neste steg
                </Heading>
                <BodyLong>Resten av søknadsflyten for reise til samling kommer senere.</BodyLong>
                <Button variant="secondary" onClick={() => navigate(reiseTilSamlingPath)}>
                    Tilbake
                </Button>
            </VStack>
        </Container>
    );
};
