import React from 'react';

import { useNavigate } from 'react-router-dom';

import { BodyLong, Button, Heading, VStack } from '@navikt/ds-react';

import { Container } from '../../../components/Side';
import { reiseOppstartAvslutningHjemreisePath } from '../../routing/routesReiseOppstartAvslutningHjemreise';

// TODO: midlertidig placeholder frem til resten av søknadsflyten er bygget ut
export const NesteStegReiseOppstartAvslutningHjemreise: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <VStack gap="space-16">
                <Heading size="large" level="1">
                    Dette er neste steg
                </Heading>
                <BodyLong>
                    Resten av søknadsflyten for reise ved oppstart, avslutning og hjemreise kommer
                    senere.
                </BodyLong>
                <Button
                    variant="secondary"
                    onClick={() => navigate(reiseOppstartAvslutningHjemreisePath)}
                >
                    Tilbake
                </Button>
            </VStack>
        </Container>
    );
};
