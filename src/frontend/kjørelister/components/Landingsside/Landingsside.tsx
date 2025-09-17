import React from 'react';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';

import { KjørelisteKort } from './KjørelisteKort';
import { RammevedtakMock } from '../../types/Rammevedtak';

const rammevedtakFraBackendMock = [RammevedtakMock, RammevedtakMock];

export function Landingsside() {
    return (
        <VStack gap="4">
            <Heading level="2" size="large">
                Velg vedtak du vil levere kjøreliste for
            </Heading>
            <BodyShort>Du kan bare levere kjøreliste for ett vedtak om gangen.</BodyShort>
            <VStack gap="2">
                {rammevedtakFraBackendMock.map((rammevedtak) => (
                    <KjørelisteKort rammevedtak={rammevedtak} />
                ))}
            </VStack>
        </VStack>
    );
}
