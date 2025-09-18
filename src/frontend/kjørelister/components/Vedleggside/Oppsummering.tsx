import React from 'react';

import { Heading, VStack } from '@navikt/ds-react';

import OppsummeringUke from './OppsummeringUke';
import { useKjøreliste } from '../../KjørelisteContext';

const Oppsummering = () => {
    const { rammevedtak } = useKjøreliste();

    return (
        <VStack gap={'8'}>
            <Heading size={'small'} level={'3'}>
                Kjøreliste
            </Heading>
            <Heading size={'small'} level={'4'}>
                2025
            </Heading>
            <VStack gap={'2'}>
                {rammevedtak.uker.map((uke) => (
                    <OppsummeringUke key={uke.ukeNummer} uke={uke} />
                ))}
            </VStack>
        </VStack>
    );
};

export default Oppsummering;
