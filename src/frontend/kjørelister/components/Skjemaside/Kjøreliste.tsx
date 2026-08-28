import { Accordion, BodyShort, Heading, VStack } from '@navikt/ds-react';
// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React from 'react';
import { useKjøreliste } from '../../KjørelisteContext';
import { KjørelisteUke } from './KjørelisteUke';

export const Kjøreliste = () => {
    const { kjøreliste } = useKjøreliste();
    const uker = kjøreliste.reisedagerPerUkeAvsnitt;
    return (
        <VStack gap="space-8">
            <Heading id="klart-til-innsending" size={'medium'}>
                Klart til innsending
            </Heading>
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
