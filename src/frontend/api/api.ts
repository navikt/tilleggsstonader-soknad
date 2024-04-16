import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Environment from './Environment';
import {
    ArbeidsrettedeAktiviterFraBackend,
    ArbeidsrettetAktivitet,
} from '../typer/arbeidsrettetAktivitet';
import { Person } from '../typer/person';
import { Stønadstype } from '../typer/stønadstyper';
import { Kvittering } from '../typer/søknad';

const requestId = () => uuidv4().replaceAll('-', '');

const defaultHeaders = () => ({
    'Content-Type': 'application/json;charset=utf-8',
    'x-request-id': requestId(),
});

export const defaultConfig = () => ({
    headers: defaultHeaders(),
    withCredentials: true,
});

export const hentPersonData = (): Promise<Person> => {
    return axios
        .get<Person>(`${Environment().apiProxyUrl}/person`, defaultConfig())
        .then((response) => response.data);
};

export const hentArbeidsrettedeAktiviteter = (): Promise<ArbeidsrettetAktivitet[]> => {
    return axios
        .get<ArbeidsrettedeAktiviterFraBackend>(
            `${Environment().apiProxyUrl}/aktivitet`,
            defaultConfig()
        )
        .then((response) => response.data.aktiviteter);
};

const stønadstypeTilPath = (stønadstype: Stønadstype): string => {
    switch (stønadstype) {
        case Stønadstype.BARNETILSYN:
            return 'barnetilsyn';
    }
};

export const sendInnSøknad = (stønadstype: Stønadstype, søknad: object): Promise<Kvittering> => {
    const url = `${Environment().apiProxyUrl}/soknad/${stønadstypeTilPath(stønadstype)}`;
    return axios.post(url, søknad, defaultConfig()).then((response) => response.data);
};

interface VedleggResponse {
    data: {
        dokumentId: string;
    };
}
export const lastOppVedlegg = (fil: File): Promise<string> => {
    const url = `${Environment().vedleggProxyUrl}`;
    const requestData = new FormData();
    requestData.append('file', fil);
    return axios
        .post<FormData, VedleggResponse>(url, requestData, {
            withCredentials: true,
            headers: {
                'x-request-id': requestId(),
                'Content-Type': 'multipart/form-data',
                accept: 'application/json',
            },
            transformRequest: () => requestData,
        })
        .then((response: VedleggResponse) => response.data.dokumentId);
};
