import React from 'react';

import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { VStack } from '@navikt/ds-react';
import { ABreakpointMd } from '@navikt/ds-tokens/dist/tokens';

import KjørelisteHeader from './components/KjørelisteHeader';
import { Landingsside } from './components/Landingsside/Landingsside';
import { KjørelisteSkjema } from './components/Skjemaside/KjørelisteSkjema';
import { KjørelisteProvider } from './KjørelisteContext';

const Container = styled.div`
    padding: 2rem 1rem 0.5rem 1rem;

    @media (min-width: ${ABreakpointMd}) {
        max-width: 35rem;
        margin: auto;
        padding: 2rem 0 0.5rem 0;
    }
`;

//TODO legg til dekoratøren
const KjørelisterApp = () => {
    return (
        <Container>
            <KjørelisteProvider>
                <VStack gap="16">
                    <KjørelisteHeader />
                    <Routes>
                        <Route path="/" element={<Landingsside />} />
                        <Route path={'/skjema'} element={<KjørelisteSkjema />} />
                    </Routes>
                </VStack>
            </KjørelisteProvider>
        </Container>
    );
};

export default KjørelisterApp;
