import React from 'react';

import { Navigate } from 'react-router-dom';

import { Alert } from '@navikt/ds-react';

import { sendBrukerTilFyllUtSøknad } from './sendSøkerTilFyllUtSøknad';
import { RoutingState, useRouting } from '../../api/useRouting';
import { SkjematypeFyllUt } from '../../typer/stønadstyper';

interface RoutingHandlerProps {
    skjematypeFyllUt: SkjematypeFyllUt;
    internRouteHvisNyLøsning?: string;
}

export const SkjemaRouting: React.FC<RoutingHandlerProps> = ({
    skjematypeFyllUt,
    internRouteHvisNyLøsning,
}) => {
    const { routingState } = useRouting(skjematypeFyllUt);

    switch (routingState) {
        case RoutingState.HENTER:
            return null;
        case RoutingState.GAMMEL:
            sendBrukerTilFyllUtSøknad(skjematypeFyllUt, 'GAMMEL');
            return null;
        case RoutingState.NY:
            if (internRouteHvisNyLøsning) {
                return <Navigate to={internRouteHvisNyLøsning} replace />;
            } else {
                sendBrukerTilFyllUtSøknad(skjematypeFyllUt, 'NY');
                return null;
            }
        case RoutingState.FEILET:
            return <Alert variant="error">Noe gikk galt! Prøv å laste siden på nytt.</Alert>;
    }
};
