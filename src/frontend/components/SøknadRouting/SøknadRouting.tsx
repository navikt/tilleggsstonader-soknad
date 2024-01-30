import React from 'react';

import { Alert } from '@navikt/ds-react';

import { RoutingState, useRouting } from '../../api/useRouting';
import { Stønadstype } from '../../typer/stønadstyper';

const SøknadRouting: React.FC<{ stønadstype: Stønadstype; children: React.ReactNode }> = ({
    stønadstype,
    children,
}) => {
    const { routingState } = useRouting(stønadstype);

    switch (routingState) {
        case RoutingState.OK:
            return children;
        case RoutingState.HENTER:
            return null;
        case RoutingState.FEILET:
            return <Alert variant="error">Noe gikk galt! Prøv å laste siden på nytt.</Alert>;
        case RoutingState.GAMMEL:
            window.location.href = `http://gammelsoknad`;
            return null;
    }
};

export default SøknadRouting;
