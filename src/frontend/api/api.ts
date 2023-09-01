import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Environment from './Environment';
import { PersonResponse } from './personResponse';
import { Stønadstype } from '../typer/stønadstyper';

const requestId = () => uuidv4().replaceAll('-', '');

const defaultHeaders = () => ({
    'Content-Type': 'application/json;charset=utf-8',
    'x-request-id': requestId(),
});

const defaultConfig = () => ({
    headers: defaultHeaders(),
    withCredentials: true,
});

export const hentPersonData = (): Promise<PersonResponse> => {
    return axios
        .get<PersonResponse>(`${Environment().apiProxyUrl}/person`, defaultConfig())
        .then((response) => response.data);
};

const stønadstypeTilPath = (stønadstype: Stønadstype): string => {
    switch (stønadstype) {
        case Stønadstype.barnetilsyn:
            return 'barnetilsyn';
    }
};

export const sendInnSøknad = (stønadstype: Stønadstype, søknad: object) => {
    const url = `${Environment().apiProxyUrl}/soknad/${stønadstypeTilPath(stønadstype)}`;
    return axios.post(url, søknad, defaultConfig()).then((response) => response.data);
};
