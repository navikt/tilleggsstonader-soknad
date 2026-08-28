import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading, Link, VStack } from '@navikt/ds-react';
// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React from 'react';

export const KjørelisteArenaLenke = () => {
    return (
        <VStack
            gap="space-8"
            style={{
                paddingBottom: '2rem'
            }}
        >
            <Heading level="2" size="medium">
                Fant du ikke det du lette etter?
            </Heading>
            <BodyShort>
                <Link href="https://www.nav.no/fyllut/nav111224b?sub=digital" target="_blank">
                    Eldre kjørelister finner du her (åpnes i ny fane) <ExternalLinkIcon />
                </Link>
            </BodyShort>
        </VStack>
    );
};
