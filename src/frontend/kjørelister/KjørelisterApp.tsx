import { VStack } from '@navikt/ds-react';
import { BreakpointMd } from '@navikt/ds-tokens/js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// biome-ignore lint/correctness/noUnusedImports: React er nødvendig for webpack JSX-transform
import React from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { KjørelisteArenaLenke } from './components/KjørelisteArenaLenke';
import { KjørelisteHeader } from './components/KjørelisteHeader';
import { Landingsside } from './components/Landingsside/Landingsside';
import { KjørelisteInnhold } from './KjørelisteInnhold';

const Container = styled.div`
    padding: 2rem 1rem 0.5rem 1rem;

    @media (min-width: ${BreakpointMd}) {
        max-width: 35rem;
        margin: auto;
        padding: 2rem 0 0.5rem 0;
    }
`;

export const KjørelisterApp = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Container>
                <VStack gap="space-64">
                    <KjørelisteHeader />
                    <Routes>
                        <Route path="/" element={<Landingsside />} />
                        <Route path={'/:reiseId/*'} element={<KjørelisteInnhold />} />
                    </Routes>
                    <KjørelisteArenaLenke />
                </VStack>
            </Container>
        </QueryClientProvider>
    );
};
