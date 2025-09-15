import React from 'react';

import styled from 'styled-components';

import { VStack } from '@navikt/ds-react';
import { ABreakpointMd } from '@navikt/ds-tokens/dist/tokens';

import Kjøreliste from './components/Kjøreliste';
import KjørelisteHeader from './components/KjørelisteHeader';
import KjørelisteMetadata from './components/KjørelisteMetadata';
import KjørelisteNavigasjonsKnapper from './components/KjørelisteNavigasjonsKnapper';
import SlikFyllerDuUtKjørelister from './components/SlikFyllerDuUtKjørelister';

const Container = styled.div`
    padding: 2rem 1rem 0.5rem 1rem;

    @media (min-width: ${ABreakpointMd}) {
        max-width: 35rem;
        margin: auto;
        padding: 2rem 0 0.5rem 0;
    }
`;

//TODO alle tekster skal være mulig å oversette
//TODO legg til dekoratøren
const KjørelisterApp = () => {
    return (
        <Container>
            <VStack gap="8">
                <KjørelisteHeader />
                <KjørelisteMetadata />
                <SlikFyllerDuUtKjørelister />
                <Kjøreliste />
                <KjørelisteNavigasjonsKnapper />
            </VStack>
        </Container>
    );
};

export default KjørelisterApp;
