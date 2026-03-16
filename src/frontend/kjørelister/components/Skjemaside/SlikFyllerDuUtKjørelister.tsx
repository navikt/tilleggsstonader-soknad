import React from 'react';

import { Box, Heading, List, VStack } from '@navikt/ds-react';

export const SlikFyllerDuUtKjørelister = () => {
    return (
        <VStack gap="space-8">
            <Heading size={'medium'}>Slik fyller du ut kjørelister</Heading>
            <Box marginBlock="space-16" asChild>
                <List data-aksel-migrated-v8 as="ul">
                    <List.Item>
                        Du kan bare fylle inn for de dagene du har kjørt til tiltaket eller
                        utdanningen din.{' '}
                    </List.Item>
                    <List.Item>
                        Du kan sende inn kjørelister så ofte du ønsker, men kun for uker som er
                        tilbake i tid.{' '}
                    </List.Item>
                </List>
            </Box>
        </VStack>
    );
};
