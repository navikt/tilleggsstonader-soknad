import React from 'react';

import { Accordion, BodyShort, Heading, VStack } from '@navikt/ds-react';

import { KjørelisteUke } from './KjørelisteUke';
import { useKjøreliste } from '../../KjørelisteContext';

export const Kjøreliste = () => {
    const { kjøreliste } = useKjøreliste();
    const uker = kjøreliste.reisedagerPerUkeAvsnitt;
    return (
        <VStack gap="space-8">
            <Heading size={'medium'}>Klart til innsending</Heading>
            {uker.length === 0 ? (
                <BodyShort>Ingen uker klare for utfylling</BodyShort>
            ) : (
                <Accordion>
                    {uker.map((ukeMedReisedager) => (
                        <KjørelisteUke
                            key={ukeMedReisedager.ukeLabel}
                            ukeMedReisedag={ukeMedReisedager}
                        />
                    ))}
                </Accordion>
            )}
        </VStack>
    );
};
