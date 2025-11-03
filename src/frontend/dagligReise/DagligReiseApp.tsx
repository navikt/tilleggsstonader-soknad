import React from 'react';

import styled from 'styled-components';

import { Heading, VStack } from '@navikt/ds-react';
import { BreakpointMdDown } from '@navikt/ds-tokens/darkside-js';

import Forside from './Forside';
import { dagligReiseTekster } from './tekster';
import SkjemaRouting from '../components/SkjemaRouting/SkjemaRouting';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

const Container = styled.div`
    padding: 2rem 1rem 0.5rem 1rem;

    @media (min-width: ${BreakpointMdDown}) {
        max-width: 35rem;
        margin: auto;
        padding: 2rem 0 0.5rem 0;
    }
`;
export function DagligReiseApp() {
    return (
        <SkjemaRouting skjematypeFyllUt={SkjematypeFyllUt.SØKNAD_DAGLIG_REISE}>
            <Container>
                <VStack gap="2">
                    <Heading size="xlarge" as="h1">
                        <LocaleTekst tekst={dagligReiseTekster.banner_daglig_reise} />
                    </Heading>
                </VStack>
            </Container>
            <Forside />
        </SkjemaRouting>
    );
}
