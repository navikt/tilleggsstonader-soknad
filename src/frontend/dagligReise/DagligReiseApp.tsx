import React, { useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Alert, Heading, VStack } from '@navikt/ds-react';
import { BreakpointMdDown } from '@navikt/ds-tokens/darkside-js';

import KanBrukeOffentligTransportSjekk from './KanBrukeOffentligTransportSjekk';
import { dagligReiseTekster } from './tekster';
import { RoutingState, useRouting } from '../api/useRouting';
import { sendSøkerTilGammelSøknad } from '../components/SkjemaRouting/sendSøkerTilGammelSøknad';
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

const DagligReiseForside = () => {
    return (
        <Container>
            <VStack gap="2">
                <Heading size="xlarge" as="h1">
                    <LocaleTekst tekst={dagligReiseTekster.banner_daglig_reise} />
                </Heading>
            </VStack>
        </Container>
    );
};

const RoutingHandler = () => {
    const { routingState } = useRouting(SkjematypeFyllUt.SØKNAD_DAGLIG_REISE);

    useEffect(() => {
        if (routingState === RoutingState.GAMMEL) {
            sendSøkerTilGammelSøknad(SkjematypeFyllUt.SØKNAD_DAGLIG_REISE);
        }
    }, [routingState]);

    switch (routingState) {
        case RoutingState.NY:
            return <Navigate to="skjema" replace />;
        case RoutingState.HENTER:
            return null; // Viser ingenting mens vi henter
        case RoutingState.FEILET:
            return <Alert variant="error">Noe gikk galt! Prøv å laste siden på nytt.</Alert>;
        case RoutingState.GAMMEL:
            return null; // Redirecter i useEffect
    }
};

export const DagligReiseApp = () => {
    return (
        <Routes>
            <Route index element={<RoutingHandler />} />
            <Route
                path="skjema"
                element={
                    <>
                        <DagligReiseForside />
                        <KanBrukeOffentligTransportSjekk />
                    </>
                }
            />
        </Routes>
    );
};
