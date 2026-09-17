import React, { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { Alert, Button, ErrorSummary, HGrid, VStack } from '@navikt/ds-react';
import { BreakpointMd } from '@navikt/ds-tokens/js';

import {
    loggBesøk,
    loggSkjemaFullført,
    loggSkjemaInnsendtFeilet,
    loggSkjemaStegFullført,
} from '../../api/analytics';
import { sendInnSøknad } from '../../api/api';
import { StegIndikator } from '../../components/StegIndikator';
import { LocaleTekst } from '../../components/Teksthåndtering/LocaleTekst';
import { useSpråk } from '../../context/SpråkContext';
import { useSøknad } from '../../context/SøknadContext';
import { useValideringsfeil } from '../../context/ValideringsfeilContext';
import { fellesTekster } from '../../tekster/felles';
import { IRoute } from '../../typer/routes';
import { inneholderFeil } from '../../typer/validering';
import { erOppsummeringsside, hentForrigeRoute, hentNesteRoute } from '../../utils/routeUtils';
import { routesReiseTilSamling, ReiseTilSamlingSteg } from '../routing/routesReiseTilSamling';

interface Props {
    children?: React.ReactNode;
    validerSteg?: () => boolean;
    oppdaterSøknad?: () => void;
}

export const Container = styled.div`
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media (min-width: ${BreakpointMd}) {
        max-width: 35rem;
        margin: auto;
        padding: 2rem 0;
    }
`;

export const Side: React.FC<Props> = ({ children, validerSteg, oppdaterSøknad }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { locale } = useSpråk();
    const { skjematype, søknad } = useSøknad();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();

    const errorRef = useRef<HTMLDivElement>(null);
    const [senderInn, settSenderInn] = useState<boolean>(false);
    const [sendInnFeil, settSendInnFeil] = useState<boolean>(false);

    const harValideringsfeil = inneholderFeil(valideringsfeil);
    useEffect(() => {
        if (errorRef.current) {
            errorRef.current.focus();
        }
    }, [harValideringsfeil]);

    const routes = routesReiseTilSamling;
    const nåværendePath = location.pathname;
    const aktivtStegIndex = routes.findIndex((steg) => steg.path === nåværendePath);
    const aktivtSteg: IRoute<ReiseTilSamlingSteg> | undefined = routes[aktivtStegIndex];

    useEffect(() => {
        if (aktivtSteg) {
            loggBesøk(skjematype, aktivtSteg.path, aktivtSteg.label);
        }
    }, [aktivtSteg, skjematype]);

    const navigerTilNesteSide = () => {
        if ((validerSteg && !validerSteg()) || !aktivtSteg) {
            return;
        }

        if (oppdaterSøknad) {
            oppdaterSøknad();
        }
        loggSkjemaStegFullført(skjematype, aktivtSteg.label);

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
        if ((validerSteg && !validerSteg()) || senderInn || !aktivtSteg) {
            return;
        }

        settSenderInn(true);

        const nesteRoute = hentNesteRoute(routes, nåværendePath);

        sendInnSøknad(skjematype, søknad)
            .then((res) => {
                loggSkjemaFullført(skjematype);
                loggBesøk(skjematype, nåværendePath, 'KVITTERING');

                navigate(nesteRoute.path, { state: { innsendtTidspunkt: res.mottattTidspunkt } });
            })
            .catch(() => {
                settSendInnFeil(true);
                loggSkjemaInnsendtFeilet(skjematype);
            })
            .finally(() => settSenderInn(false));
    };

    if (!aktivtSteg) {
        return null;
    }

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
            <VStack gap="space-32">{children}</VStack>
            <HGrid gap="space-16" columns={'1fr 1fr'}>
                <Button variant="secondary" onClick={navigerTilForrigeSide}>
                    <LocaleTekst tekst={fellesTekster.forrige} />
                </Button>
                {erOppsummeringsside(aktivtSteg.route) ? (
                    <Button onClick={sendSøknad} loading={senderInn}>
                        <LocaleTekst tekst={fellesTekster.send_inn_søknad} />
                    </Button>
                ) : (
                    <Button onClick={navigerTilNesteSide}>
                        <LocaleTekst tekst={fellesTekster.neste} />
                    </Button>
                )}
            </HGrid>
            {sendInnFeil && (
                <Alert variant={'error'}>
                    <LocaleTekst tekst={fellesTekster.send_inn_søknad_feil} />
                </Alert>
            )}
        </Container>
    );
};
