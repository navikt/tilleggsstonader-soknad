import React, { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { Alert, Button, ErrorSummary, VStack } from '@navikt/ds-react';
import { ABreakpointMd } from '@navikt/ds-tokens/dist/tokens';

import { StegIndikator } from './StegIndikator';
import LocaleTekst from './Teksthåndtering/LocaleTekst';
import {
    loggBesøkBarnetilsyn,
    loggSkjemaFullført,
    loggSkjemaInnsendtFeilet,
    loggSkjemaStegFullført,
} from '../api/amplitude';
import { sendInnSøknad } from '../api/api';
import { ERouteBarnetilsyn, RouteTilPath } from '../barnetilsyn/routing/routesBarnetilsyn';
import { useSpråk } from '../context/SpråkContext';
import { useSøknad } from '../context/SøknadContext';
import { fellesTekster } from '../tekster/felles';
import { IRoute } from '../typer/routes';
import { Stønadstype } from '../typer/stønadstyper';
import { inneholderFeil } from '../typer/validering';
import { hentForrigeRoute, hentNesteRoute, hentRoutes } from '../utils/routes';

interface Props {
    stønadstype: Stønadstype;
    children?: React.ReactNode;
    validerSteg?: () => boolean;
    oppdaterSøknad?: () => void;
}

export const Container = styled.div`
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media (min-width: ${ABreakpointMd}) {
        max-width: 35rem;
        margin: auto;
        padding: 2rem 0;
    }
`;

const KnappeContainerMedFeilmelding = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

const Side: React.FC<Props> = ({ stønadstype, children, validerSteg, oppdaterSøknad }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { locale } = useSpråk();
    const {
        valideringsfeil,
        settValideringsfeil,
        hovedytelse,
        aktivitet,
        barnMedBarnepass,
        dokumentasjon,
        settInnsentTidspunkt,
    } = useSøknad();

    const errorRef = useRef<HTMLDivElement>(null);
    const [senderInn, settSenderInn] = useState<boolean>(false);
    const [sendInnFeil, settSendInnFeil] = useState<boolean>(false);

    const harValideringsfeil = inneholderFeil(valideringsfeil);
    useEffect(() => {
        errorRef.current && errorRef.current.focus();
    }, [harValideringsfeil]);

    const routes = hentRoutes(stønadstype);
    const nåværendePath = location.pathname;
    const aktivtStegIndex = routes.findIndex((steg) => steg.path === nåværendePath);
    const aktivtSteg: IRoute | undefined = routes[aktivtStegIndex];

    useEffect(() => {
        loggBesøkBarnetilsyn(aktivtSteg.path, aktivtSteg.label);
    }, [aktivtSteg]);

    const navigerTilNesteSide = () => {
        if (validerSteg && !validerSteg()) {
            return;
        }

        oppdaterSøknad && oppdaterSøknad();
        loggSkjemaStegFullført(stønadstype, aktivtSteg.label);

        const nesteRoute = hentNesteRoute(routes, nåværendePath);
        navigate(nesteRoute.path);
    };

    const navigerTilForrigeSide = () => {
        if (senderInn) {
            return;
        }
        settValideringsfeil({});
        const forrigeRoute = hentForrigeRoute(routes, nåværendePath);
        navigate(forrigeRoute.path);
    };

    const sendSøknad = () => {
        if ((validerSteg && !validerSteg()) || senderInn) {
            return;
        }

        settSenderInn(true);

        const nesteRoute = hentNesteRoute(routes, nåværendePath);
        sendInnSøknad(stønadstype, {
            hovedytelse,
            aktivitet,
            barnMedBarnepass,
            dokumentasjon,
        })
            .then((res) => {
                settInnsentTidspunkt(res.mottattTidspunkt);

                loggSkjemaFullført(stønadstype);
                loggBesøkBarnetilsyn(
                    RouteTilPath[ERouteBarnetilsyn.KVITTERING],
                    ERouteBarnetilsyn.KVITTERING
                );

                navigate(nesteRoute.path);
            })
            // TODO håndtering av 401?
            .catch(() => {
                settSendInnFeil(true);
                loggSkjemaInnsendtFeilet(stønadstype);
            })
            .finally(() => settSenderInn(false));
    };

    return (
        <Container>
            <StegIndikator
                gjeldendeSteg={aktivtStegIndex}
                antallStegTotalt={routes.length - 2}
                autofokoserSkjermleser
            />
            {harValideringsfeil && (
                <ErrorSummary heading={fellesTekster.tittel_error_summary[locale]} ref={errorRef}>
                    {Object.entries(valideringsfeil).map(
                        ([id, error]) =>
                            error && (
                                <ErrorSummary.Item key={`${id}`} href={`#${error.id}`}>
                                    {error.melding}
                                </ErrorSummary.Item>
                            )
                    )}
                </ErrorSummary>
            )}
            <VStack gap={'6'}>{children}</VStack>
            <KnappeContainerMedFeilmelding>
                <Button variant="secondary" onClick={navigerTilForrigeSide}>
                    <LocaleTekst tekst={fellesTekster.forrige} />
                </Button>
                {aktivtSteg.route === ERouteBarnetilsyn.OPPSUMMERING ? (
                    <Button onClick={sendSøknad} loading={senderInn}>
                        <LocaleTekst tekst={fellesTekster.send_inn_søknad} />
                    </Button>
                ) : (
                    <Button onClick={navigerTilNesteSide}>
                        <LocaleTekst tekst={fellesTekster.neste} />
                    </Button>
                )}
            </KnappeContainerMedFeilmelding>
            {sendInnFeil && (
                <Alert variant={'error'}>
                    <LocaleTekst tekst={fellesTekster.send_inn_søknad_feil} />
                </Alert>
            )}
        </Container>
    );
};

export default Side;
