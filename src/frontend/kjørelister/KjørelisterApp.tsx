import React from 'react';

import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { ABreakpointMd } from '@navikt/ds-tokens/dist/tokens';

import { KjørelisteProvider } from './KjørelisteContext';
import { KjørelisteSkjema } from './KjørelisteSkjema';
import { Landingsside } from './Landingsside';

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
                <Routes>
                    <Route path="/" element={<Landingsside />} />
                    <Route path={'/skjema'} element={<KjørelisteSkjema />} />
                </Routes>
            </KjørelisteProvider>
        </Container>
    );
};

export default KjørelisterApp;
