import { Alert } from '@navikt/ds-react';

import Søknadsdialog from './Søknadsdialog';
import { RoutingState, useRouting } from '../api/useRouting';
import { Stønadstype } from '../typer/stønadstyper';

const BarnetilsynApp = () => {
    const { routingState } = useRouting(Stønadstype.BARNETILSYN);

    switch (routingState) {
        case RoutingState.OK:
            return <Søknadsdialog />;
        case RoutingState.HENTER:
            return null;
        case RoutingState.FEILET:
            return <Alert variant="error">Noe gikk galt! Prøv å laste siden på nytt.</Alert>;
        case RoutingState.GAMMEL:
            window.location.href = `http://gammelsoknad`;
    }
};

export default BarnetilsynApp;
