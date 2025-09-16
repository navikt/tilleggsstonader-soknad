import React from 'react';

import { Accordion, Heading, VStack } from '@navikt/ds-react';

import KjørelisteUke from './KjørelisteUke';
import { useKjøreliste } from '../KjørelisteContext';

const Kjøreliste = () => {
    const { rammevedtak } = useKjøreliste();
    return (
        <VStack gap={'2'}>
            <Heading size={'medium'}>Klart til innsending</Heading>
            <Heading size={'medium'}>2025</Heading>
            <Accordion>
                {rammevedtak.uker.map((uke) => (
                    <KjørelisteUke key={uke.ukeNummer} uke={uke} />
                ))}
            </Accordion>
        </VStack>
    );
};

export default Kjøreliste;
