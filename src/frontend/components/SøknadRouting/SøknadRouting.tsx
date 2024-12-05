import React from 'react';

import { Alert } from '@navikt/ds-react';

import { sendSøkerTilGammelSøknad } from './sendSøkerTilGammelSøknad';
import { RoutingState, useRouting } from '../../api/useRouting';
import { useSøknad } from '../../context/SøknadContext';

const SøknadRouting: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { stønadstype } = useSøknad();
    const { routingState } = useRouting(stønadstype);

    switch (routingState) {
        case RoutingState.NY:
            return children;
        case RoutingState.HENTER:
            return null;
        case RoutingState.FEILET:
            return <Alert variant="error">Noe gikk galt! Prøv å laste siden på nytt.</Alert>;
        case RoutingState.GAMMEL:
            sendSøkerTilGammelSøknad(stønadstype);
            return null;
    }
};

export default SøknadRouting;
