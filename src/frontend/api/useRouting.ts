import { useEffect, useState } from 'react';

import axios from 'axios';

import { defaultConfig } from './api';
import Environment from './Environment';
import { StønadstypeRouting } from '../typer/stønadstyper';

interface SøknadRouting {
    skalBehandlesINyLøsning: boolean;
}

export enum RoutingState {
    NY = 'NY',
    GAMMEL = 'GAMMEL',
    FEILET = 'FEILET',
    HENTER = 'HENTER',
}

const sjekkRouting = (stønadstype: StønadstypeRouting): Promise<SøknadRouting> => {
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

export const useRouting = (stønadstype: StønadstypeRouting) => {
    const [routingState, setRoutingState] = useState<RoutingState>(RoutingState.HENTER);

    useEffect(() => {
        sjekkRouting(stønadstype)
            .then((res) =>
                setRoutingState(res.skalBehandlesINyLøsning ? RoutingState.NY : RoutingState.GAMMEL)
            )
            .catch(() => setRoutingState(RoutingState.FEILET));
    }, [stønadstype]);
    return {
        routingState,
    };
};
