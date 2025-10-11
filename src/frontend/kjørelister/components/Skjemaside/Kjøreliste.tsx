import React from 'react';

import { Accordion, Heading, VStack } from '@navikt/ds-react';

import { KjørelisteUke } from './KjørelisteUke';
import { useKjøreliste } from '../../KjørelisteContext';

export const Kjøreliste = () => {
    const { kjøreliste } = useKjøreliste();
    return (
        <VStack gap={'2'}>
            <Heading size={'medium'}>Klart til innsending</Heading>
            <Accordion>
                {kjøreliste.reisedagerPerUkeAvsnitt.map((ukeMedReisedager) => (
                    <KjørelisteUke
                        key={ukeMedReisedager.ukeLabel}
                        ukeMedReisedag={ukeMedReisedager}
                    />
                ))}
            </Accordion>
        </VStack>
    );
};
