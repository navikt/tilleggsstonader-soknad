import axios from 'axios';

import { defaultConfig } from './api';
import Environment from './Environment';

export const hentMellomlagring = <T>(stønadstype: 'tilsyn-barn'): Promise<T> => {
    return axios
        .get<T>(`${Environment().apiProxyUrl}/mellomlager/${stønadstype}`, defaultConfig())
        .then((response) => response.data);
};

export const mellomlagreSøknad = <T>(stønadstype: 'tilsyn-barn', data: T): Promise<number> => {
    return axios
        .post(`${Environment().apiProxyUrl}/mellomlager/${stønadstype}`, data, defaultConfig())
        .then((response) => response.status);
};

export const slettMellomlagring = (stønadstype: 'tilsyn-barn'): Promise<number> => {
    return axios
        .delete(`${Environment().apiProxyUrl}/mellomlager/${stønadstype}`, defaultConfig())
        .then((response) => response.status);
};
