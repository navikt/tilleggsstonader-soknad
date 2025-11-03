import React, { useEffect } from 'react';

import { Alert } from '@navikt/ds-react';

import { sendSøkerTilGammelSøknad } from './sendSøkerTilGammelSøknad';
import { RoutingState, useRouting } from '../../api/useRouting';
import { SkjematypeFyllUt } from '../../typer/stønadstyper';

const SkjemaRouting: React.FC<{
    skjematypeFyllUt: SkjematypeFyllUt;
    children: React.ReactNode;
}> = ({ skjematypeFyllUt, children }) => {
    const { routingState } = useRouting(skjematypeFyllUt);

    useEffect(() => {
        if (routingState === RoutingState.GAMMEL) {
            sendSøkerTilGammelSøknad(skjematypeFyllUt);
        }
    }, [routingState, skjematypeFyllUt]);

    switch (routingState) {
        case RoutingState.NY:
            return children;
        case RoutingState.HENTER:
            return null;
        case RoutingState.FEILET:
            return <Alert variant="error">Noe gikk galt! Prøv å laste siden på nytt.</Alert>;
        case RoutingState.GAMMEL:
            return null;
    }
};

export default SkjemaRouting;
