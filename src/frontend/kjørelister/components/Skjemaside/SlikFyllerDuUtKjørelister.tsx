import React from 'react';

import { Heading, List, VStack } from '@navikt/ds-react';

const SlikFyllerDuUtKjørelister = () => {
    return (
        <VStack gap="2">
            <Heading size={'medium'}>Slik fyller du ut kjørelister</Heading>
            <List as="ul">
                <List.Item>
                    Du kan bare fylle inn for de dagene du har kjørt til tiltaket eller utdanningen
                    din.{' '}
                </List.Item>
                <List.Item>
                    Du kan sende inn kjørelister så ofte du ønsker, men kun for uker som er tilbake
                    i tid.{' '}
                </List.Item>
            </List>
        </VStack>
    );
};

export default SlikFyllerDuUtKjørelister;
