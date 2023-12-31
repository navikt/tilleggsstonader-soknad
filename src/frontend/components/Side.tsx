import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react';
import { ABreakpointMd } from '@navikt/ds-tokens/dist/tokens';

import LocaleTekst from './Teksthåndtering/LocaleTekst';
import { sendInnSøknad } from '../api/api';
import { ERouteBarnetilsyn } from '../barnetilsyn/routing/routesBarnetilsyn';
import { useSøknad } from '../context/SøknadContext';
import { fellesTekster } from '../tekster/felles';
import { IRoute } from '../typer/routes';
import { Stønadstype } from '../typer/stønadstyper';
import { TekstElement } from '../typer/tekst';
import { hentForrigeRoute, hentNesteRoute, hentRoutes } from '../utils/routes';

interface Props {
    stønadstype: Stønadstype;
    stegtittel: TekstElement<string>;
    children?: React.ReactNode;
    validerSteg?: () => boolean;
    oppdaterSøknad?: () => void;
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

const KnappeContainerMedFeilmelding = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    .feilmelding {
        grid-column: 1 / span 2;
    }
`;

const Side: React.FC<Props> = ({
    stønadstype,
    stegtittel,
    children,
    validerSteg,
    oppdaterSøknad,
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hovedytelse, aktivitet, barnMedBarnepass, dokumentasjon } = useSøknad();

    const [sendInnFeil, settSendInnFeil] = useState<boolean>(false);

    const routes = hentRoutes(stønadstype);
    const nåværendePath = location.pathname;
    const aktivtStegIndex = routes.findIndex((steg) => steg.path === nåværendePath);
    const aktivtSteg: IRoute | undefined = routes[aktivtStegIndex];

    const navigerTilNesteSide = () => {
        if (validerSteg && !validerSteg()) {
            return;
        }

        oppdaterSøknad && oppdaterSøknad();

        const nesteRoute = hentNesteRoute(routes, nåværendePath);
        navigate(nesteRoute.path);
    };

    const navigerTilForrigeSide = () => {
        const forrigeRoute = hentForrigeRoute(routes, nåværendePath);
        navigate(forrigeRoute.path);
    };

    const sendSøknad = () => {
        if (validerSteg && !validerSteg()) {
            return;
        }

        const nesteRoute = hentNesteRoute(routes, nåværendePath);
        sendInnSøknad(stønadstype, {
            hovedytelse: hovedytelse?.ytelse,
            aktivitet,
            barnMedBarnepass,
            dokumentasjon,
        })
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
            <KnappeContainerMedFeilmelding>
                <Button variant="secondary" onClick={navigerTilForrigeSide}>
                    <LocaleTekst tekst={fellesTekster.forrige} />
                </Button>
                {aktivtSteg.route === ERouteBarnetilsyn.OPPSUMMERING ? (
                    <Button onClick={sendSøknad}>
                        <LocaleTekst tekst={fellesTekster.send_inn_søknad} />
                    </Button>
                ) : (
                    <Button onClick={navigerTilNesteSide}>
                        <LocaleTekst tekst={fellesTekster.neste} />
                    </Button>
                )}
                {sendInnFeil && (
                    <Alert variant={'error'} className="feilmelding">
                        <LocaleTekst tekst={fellesTekster.send_inn_søknad_feil} />
                    </Alert>
                )}
            </KnappeContainerMedFeilmelding>
        </Container>
    );
};

export default Side;
