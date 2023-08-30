import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { ABreakpointMd } from '@navikt/ds-tokens/dist/tokens';

import LocaleTekst from './Teksthåndtering/LocaleTekst';
import { ERouteBarnetilsyn } from '../barnetilsyn/routing/routesBarnetilsyn';
import { sendInnSøknad } from '../innsending/api';
import { fellesTekster } from '../tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';
import { TekstElement } from '../typer/tekst';
import { hentForrigeRoute, hentNesteRoute, hentRoutes } from '../utils/routes';

interface Props {
    stønadstype: Stønadstype;
    stegtittel: TekstElement<string>;
    children?: React.ReactNode;
    validerSteg?: () => boolean;
}

export const Container = styled.div`
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media (min-width: ${ABreakpointMd}) {
        max-width: 35rem;
        margin: auto;
        padding: 2rem 0;
    }
`;

const StegIndikator = styled.div`
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

const Side: React.FC<Props> = ({ stønadstype, stegtittel, children, validerSteg }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [sendInnFeil, settSendInnFeil] = useState<boolean>(false);

    const routes = hentRoutes(stønadstype);
    const nåværendePath = location.pathname;
    const aktivtStegIndex = routes.findIndex((steg) => steg.path === nåværendePath);
    const aktivtSteg = routes[aktivtStegIndex];

    const navigerTilNesteSide = () => {
        if (validerSteg && !validerSteg()) {
            return;
        }
        const nesteRoute = hentNesteRoute(routes, nåværendePath);
        navigate(nesteRoute.path);
    };

    const navigerTilForrigeSide = () => {
        const forrigeRoute = hentForrigeRoute(routes, nåværendePath);
        navigate(forrigeRoute.path);
    };

    const sendSøknad = () => {
        const nesteRoute = hentNesteRoute(routes, nåværendePath);
        sendInnSøknad(stønadstype, {})
            .then(() => navigate(nesteRoute.path))
            // TODO håndtering av 401?
            .catch(() => settSendInnFeil(true));
    };

    return (
        <Container>
            <StegIndikator>
                <Heading size="medium" as="h2">
                    <LocaleTekst tekst={stegtittel} />
                </Heading>
                <BodyShort size="small">
                    Steg {aktivtStegIndex} av {routes.length - 2}
                </BodyShort>
            </StegIndikator>
            <Innhold>{children}</Innhold>
            <KnappeContainer>
                <Button variant="secondary" onClick={navigerTilForrigeSide}>
                    <LocaleTekst tekst={fellesTekster.forrige} />
                </Button>
                {aktivtSteg.route === ERouteBarnetilsyn.OPPSUMMERING ? (
                    <>
                        <Button onClick={sendSøknad}>
                            <LocaleTekst tekst={fellesTekster.sendInnSøknad} />
                        </Button>
                        {sendInnFeil && <LocaleTekst tekst={fellesTekster.sendInnSøknadFeil} />}
                    </>
                ) : (
                    <Button onClick={navigerTilNesteSide}>
                        <LocaleTekst tekst={fellesTekster.neste} />
                    </Button>
                )}
            </KnappeContainer>
        </Container>
    );
};

export default Side;
