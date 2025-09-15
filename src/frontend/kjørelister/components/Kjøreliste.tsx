import React from 'react';

import { Accordion, Heading, VStack } from '@navikt/ds-react';

import KjørelisteUke from './KjørelisteUke';

const Kjøreliste = () => {
    return (
        <VStack gap={'2'}>
            <Heading size={'medium'}>Klart til innsending</Heading>
            <Heading size={'medium'}>2025</Heading>
            <Accordion>
                {/*Array kun for å mocke data*/}
                {Array.from({ length: 4 }, (_, i) => (
                    <KjørelisteUke key={i + 12} uke={i + 12} />
                ))}
            </Accordion>
        </VStack>
    );
};

export default Kjøreliste;
