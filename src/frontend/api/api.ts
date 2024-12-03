import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Environment from './Environment';
import { Person } from '../typer/person';
import { RegisterAktiviteterResponse, RegisterAktivitet } from '../typer/registerAktivitet';
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

export const hentPersonData = (medBarn: boolean): Promise<Person> => {
    return axios
        .get<Person>(
            `${Environment().apiProxyUrl}/person${medBarn ? '/med-barn' : ''}`,
            defaultConfig()
        )
        .then((response) => response.data);
};

export const hentArbeidsrettedeAktiviteter = (): Promise<RegisterAktivitet[]> => {
    return axios
        .get<RegisterAktiviteterResponse>(`${Environment().apiProxyUrl}/aktivitet`, defaultConfig())
        .then((response) => response.data.aktiviteter);
};
export const hentBehandlingStatus = (stønadstype: Stønadstype): Promise<boolean> => {
    return axios
        .get<boolean>(
            `${Environment().apiProxyUrl}/person/har-behandling?stonadstype=${encodeURIComponent(stønadstype)}`,
            defaultConfig()
        )
        .then((response) => response.data);
};

const stønadstypeTilPath = (stønadstype: Stønadstype): string => {
    switch (stønadstype) {
        case Stønadstype.BARNETILSYN:
            return 'pass-av-barn';
        case Stønadstype.LÆREMIDLER:
            return 'laremidler';
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
