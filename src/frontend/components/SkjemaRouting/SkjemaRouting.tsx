import React from 'react';

import { Alert } from '@navikt/ds-react';

import { sendSøkerTilGammelSøknad } from './sendSøkerTilGammelSøknad';
import { RoutingState, useRouting } from '../../api/useRouting';
import { SkjematypeFyllUt } from '../../typer/stønadstyper';

const SkjemaRouting: React.FC<{ skjmatypeFyllUt: SkjematypeFyllUt; children: React.ReactNode }> = ({
    skjmatypeFyllUt,
    children,
}) => {
    const { routingState } = useRouting(skjmatypeFyllUt);

    switch (routingState) {
        case RoutingState.NY:
            return children;
        case RoutingState.HENTER:
            return null;
        case RoutingState.FEILET:
            return <Alert variant="error">Noe gikk galt! Prøv å laste siden på nytt.</Alert>;
        case RoutingState.GAMMEL:
            sendSøkerTilGammelSøknad(skjmatypeFyllUt);
            return null;
    }
};

export default SkjemaRouting;
