import React from 'react';

import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { VStack } from '@navikt/ds-react';
import { BreakpointMd } from '@navikt/ds-tokens/darkside-js';

import KjørelisteHeader from './components/KjørelisteHeader';
import Kvitteringsside from './components/Kvitteringsside/Kvitteringsside';
import { Landingsside } from './components/Landingsside/Landingsside';
import Oppsummeringsside from './components/Oppsummering/Oppsummeringsside';
import { KjørelisteSkjema } from './components/Skjemaside/KjørelisteSkjema';
import { Vedleggside } from './components/Vedleggside/Vedleggside';
import { KjørelisteProvider } from './KjørelisteContext';

const Container = styled.div`
    padding: 2rem 1rem 0.5rem 1rem;

    @media (min-width: ${BreakpointMd}) {
        max-width: 35rem;
        margin: auto;
        padding: 2rem 0 0.5rem 0;
    }
`;

const KjørelisterApp = () => {
    return (
        <Container>
            <KjørelisteProvider>
                <VStack gap="16">
                    <KjørelisteHeader />
                    <Routes>
                        <Route path="/" element={<Landingsside />} />
                        <Route path={'/skjema'} element={<KjørelisteSkjema />} />
                        <Route path={'/vedlegg'} element={<Vedleggside />} />
                        <Route path={'/oppsummering'} element={<Oppsummeringsside />} />
                        <Route path={'/kvittering'} element={<Kvitteringsside />} />
                    </Routes>
                </VStack>
            </KjørelisteProvider>
        </Container>
    );
};

export default KjørelisterApp;
