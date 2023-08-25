import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { ABreakpointMd } from '@navikt/ds-tokens/dist/tokens';

import { LocaleTekst } from './LocaleTekst';
import { fellesTekster } from '../tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';
import { TekstElement } from '../typer/tekst';
import { hentForrigeRoute, hentNesteRoute, hentRoutes } from '../utils/routes';

interface Props {
    stønadstype: Stønadstype;
    stegtittel: TekstElement;
    children?: React.ReactNode;
}

const Container = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media (min-width: ${ABreakpointMd}) {
        max-width: 40rem;
        margin: auto;
        padding: 2rem 0;
    }
`;

const Stegindikator = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Innhold = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const KnappeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

const Side: React.FC<Props> = ({ stønadstype, stegtittel, children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const routes = hentRoutes(stønadstype);
    const nåværendePath = location.pathname;
    const aktivtSteg = routes.findIndex((steg) => steg.path === nåværendePath);

    const navigerTilNesteSide = () => {
        const nesteRoute = hentNesteRoute(routes, nåværendePath);
        navigate(nesteRoute.path);
    };

    const navigerTilForrigeSide = () => {
        const forrigeRoute = hentForrigeRoute(routes, nåværendePath);
        navigate(forrigeRoute.path);
    };

    return (
        <Container>
            <Stegindikator>
                <Heading size="medium" as="h2">
                    <LocaleTekst tekst={stegtittel} />
                </Heading>
                <BodyShort size="small">
                    Steg {aktivtSteg} av {routes.length - 1}
                </BodyShort>
            </Stegindikator>
            <Innhold>{children}</Innhold>
            <KnappeContainer>
                <Button variant="secondary" onClick={navigerTilForrigeSide}>
                    <LocaleTekst tekst={fellesTekster.forrige} />
                </Button>
                <Button onClick={navigerTilNesteSide}>
                    <LocaleTekst tekst={fellesTekster.neste} />
                </Button>
            </KnappeContainer>
        </Container>
    );
};

export default Side;
