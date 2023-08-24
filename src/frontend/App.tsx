import React from 'react';

import styled from 'styled-components';

import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';

const Container = styled.div`
    margin: 1rem;
`;
const App: React.FC = () => {
    return (
        <Container>
            <GuidePanel poster>
                <Heading size={'large'}>Søknad om tilleggsstønader</Heading>
                <BodyShort>Her kommer søknad om barnetilsyn</BodyShort>
            </GuidePanel>
        </Container>
    );
};

export default App;
