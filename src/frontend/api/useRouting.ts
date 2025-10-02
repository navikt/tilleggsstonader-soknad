import { useEffect, useState } from 'react';

import axios from 'axios';

import { defaultConfig } from './api';
import Environment from './Environment';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

interface SkjemaRoutingResponse {
    skalBehandlesINyLøsning: boolean;
}

export enum RoutingState {
    NY = 'NY',
    GAMMEL = 'GAMMEL',
    FEILET = 'FEILET',
    HENTER = 'HENTER',
}

const sjekkRouting = async (skjematype: SkjematypeFyllUt): Promise<SkjemaRoutingResponse> => {
    const request = {
        skjematype,
    };
    const response = await axios.post<SkjemaRoutingResponse>(
        `${Environment().apiProxyUrl}/skjema-routing`,
        request,
        defaultConfig()
    );
    return response.data;
};

export const useRouting = (skjematype: SkjematypeFyllUt) => {
    const [routingState, setRoutingState] = useState<RoutingState>(RoutingState.HENTER);

    useEffect(() => {
        sjekkRouting(skjematype)
            .then((res) =>
                setRoutingState(res.skalBehandlesINyLøsning ? RoutingState.NY : RoutingState.GAMMEL)
            )
            .catch(() => setRoutingState(RoutingState.FEILET));
    }, [skjematype]);
    return {
        routingState,
    };
};
