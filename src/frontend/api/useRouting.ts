import { useEffect, useState } from 'react';

import axios from 'axios';

import { defaultConfig } from './api';
import Environment from './Environment';
import { Stønadstype } from '../typer/stønadstyper';

interface SøknadRouting {
    skalRoutesTilNyLøsning: boolean;
}

export enum RoutingState {
    OK = 'OK',
    GAMMEL = 'GAMMEL',
    FEILET = 'FEILET',
    HENTER = 'HENTER',
}

const sjekkRouting = (stønadstype: Stønadstype): Promise<SøknadRouting> => {
    const request = {
        stønadstype,
    };
    return axios
        .post<SøknadRouting>(
            `${Environment().apiProxyUrl}/soknad-routing`,
            request,
            defaultConfig()
        )
        .then((response) => response.data);
};

export const useRouting = (stønadstype: Stønadstype) => {
    const [routingState, setRoutingState] = useState<RoutingState>(RoutingState.HENTER);

    useEffect(() => {
        sjekkRouting(stønadstype)
            .then((res) =>
                setRoutingState(res.skalRoutesTilNyLøsning ? RoutingState.GAMMEL : RoutingState.OK)
            )
            .catch(() => setRoutingState(RoutingState.FEILET));
    }, [stønadstype]);
    return {
        routingState,
    };
};
