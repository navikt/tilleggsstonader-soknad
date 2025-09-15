import React from 'react';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';

const KjørelisteMetadata = () => {
    return (
        <VStack gap={'2'}>
            <Heading size={'medium'}>Denne kjørelisten gjelder</Heading>
            <BodyShort weight={'semibold'}>Dummy tiltak</BodyShort>
            <BodyShort>01. januar 2025 - 01. juni 2025</BodyShort>
            <BodyShort>Addresse: Osloveien 1, 1234 Oslo</BodyShort>
            <BodyShort>3 dager per uke</BodyShort>
        </VStack>
    );
};

export default KjørelisteMetadata;
