import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { Alert, BodyShort, Heading, Link, Skeleton, VStack } from '@navikt/ds-react';

import { KjørelisteKort } from './KjørelisteKort';
import { hentAlleRammevedtak } from '../../../api/api';

export function Landingsside() {
    const { isPending, error, data } = useQuery({
        queryKey: ['rammevedtak'],
        queryFn: () => hentAlleRammevedtak(),
    });

    if (error) {
        return <Alert variant={'error'}>Kunne ikke henter kjørelister. Prøv igjen senere.</Alert>;
    }

    if (isPending) {
        return <Skeleton variant={'rounded'} height={180} />;
    }

    if (data.length === 0) {
        return (
            <Alert variant="info">
                <VStack gap="space-8">
                    <BodyShort>
                        Det finnes ingen tilgjenglige kjørelister knyttet til deg.
                    </BodyShort>
                    <Link href="https://www.nav.no/tilleggsstonader">
                        Les om tilleggsstønader og søk om støtte.
                    </Link>
                </VStack>
            </Alert>
        );
    }

    return (
        <VStack gap="space-16">
            <Heading level="2" size="large">
                Velg vedtak du vil levere kjøreliste for
            </Heading>
            <BodyShort>Du kan bare levere kjøreliste for ett vedtak om gangen.</BodyShort>
            <VStack gap="space-8">
                {data.map((rammevedtak) => (
                    <KjørelisteKort key={rammevedtak.fom} rammevedtak={rammevedtak} />
                ))}
            </VStack>
        </VStack>
    );
}
