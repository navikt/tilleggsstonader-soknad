import React from 'react';

import { BodyShort, Heading } from '@navikt/ds-react';

import { Container } from '../components/Side';

export const flyttingPath = '/flytting';

export const FlyttingApp: React.FC = () => (
    <Container>
        <Heading size="xlarge" as="h1">
            Søknad om støtte til flytting
        </Heading>
        <BodyShort>Søknaden er under utvikling.</BodyShort>
    </Container>
);
