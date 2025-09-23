import React from 'react';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';

export const KjørelisteHeader = () => {
    return (
        <VStack gap="2">
            {/*TODO kan erstattes av components/Header.tsx med litt refaktorering*/}
            <BodyShort>NAV 11-12.16</BodyShort>
            <Heading size="xlarge" as="h1">
                {/*TODO det skal være et ikon her*/}
                Kjøreliste
            </Heading>
        </VStack>
    );
};
