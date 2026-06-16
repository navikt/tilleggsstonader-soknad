import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Environment } from './Environment';
import { Kjøreliste, KjørelisteKvittering } from '../kjørelister/types/Kjøreliste';
import { Rammevedtak } from '../kjørelister/types/Rammevedtak';
import { Person } from '../typer/person';
import { RegisterAktivitet, RegisterAktiviteterResponse } from '../typer/registerAktivitet';
import { Skjematype } from '../typer/skjematyper';
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

export const hentPersonData = async (medBarn: boolean): Promise<Person> => {
    const response = await axios.get<Person>(
        `${Environment().apiProxyUrl}/person${medBarn ? '/med-barn' : ''}`,
        defaultConfig()
    );
    return response.data;
};

export const hentArbeidsrettedeAktiviteter = async (
    skjematype: Skjematype
): Promise<RegisterAktivitet[]> => {
    const url = `${Environment().apiProxyUrl}/aktivitet`;
    const response = await axios.post<RegisterAktiviteterResponse>(
        url,
        { skjematype },
        defaultConfig()
    );
    return response.data.aktiviteter;
};

export const hentBehandlingStatus = async (skjematype: Skjematype): Promise<boolean> => {
    const response = await axios.get<boolean>(
        `${Environment().apiProxyUrl}/person/har-behandling?skjematype=${encodeURIComponent(skjematype)}`,
        defaultConfig()
    );
    return response.data;
};

const skjematypeTilPath = (skjematype: Skjematype): string => {
    switch (skjematype) {
        case Skjematype.SØKNAD_BARNETILSYN:
            return 'pass-av-barn';
        case Skjematype.SØKNAD_LÆREMIDLER:
            return 'laremidler';
        case Skjematype.SØKNAD_REISE_TIL_SAMLING:
            return 'reise-til-samling';
    }
};

export const sendInnSøknad = (skjematype: Skjematype, søknad: object): Promise<Kvittering> => {
    const url = `${Environment().apiProxyUrl}/soknad/${skjematypeTilPath(skjematype)}`;
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

export const hentAlleRammevedtak = (): Promise<Rammevedtak[]> => {
    return axios
        .get<
            Rammevedtak[]
        >(`${Environment().apiProxyUrl}/kjorelister/alle-rammevedtak`, defaultConfig())
        .then((response) => response.data);
};

export const hentRammevedtak = (reiseId: string): Promise<Rammevedtak> => {
    return axios
        .get<Rammevedtak>(
            `${Environment().apiProxyUrl}/kjorelister/rammevedtak/${reiseId}`,
            defaultConfig()
        )
        .then((response) => response.data);
};

export const hentTidligereInnsendt = (reiseId: string): Promise<Kjøreliste | null> => {
    return axios
        .get<Kjøreliste | null>(
            `${Environment().apiProxyUrl}/kjorelister/${reiseId}`,
            defaultConfig()
        )
        .then((response) => response.data);
};

export const sendInnKjøreliste = (kjøreliste: Kjøreliste): Promise<KjørelisteKvittering> => {
    const url = `${Environment().apiProxyUrl}/kjorelister`;
    return axios.post(url, kjøreliste, defaultConfig()).then((response) => response.data);
};
