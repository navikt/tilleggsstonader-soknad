import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { VStack } from '@navikt/ds-react';
import { BreakpointMd } from '@navikt/ds-tokens/darkside-js';

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
                <VStack gap="16">
                    <KjørelisteHeader />
                    <Routes>
                        <Route path="/" element={<Landingsside />} />
                        <Route path={'/:reiseId/*'} element={<KjørelisteInnhold />} />
                    </Routes>
                </VStack>
            </Container>
        </QueryClientProvider>
    );
};
