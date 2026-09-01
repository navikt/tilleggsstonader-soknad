import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { Environment } from './Environment';
import { triggGlobalFeil } from './globalFeil';
import { Kjøreliste, KjørelisteKvittering } from '../kjørelister/types/Kjøreliste';
import { KjørelisteVisningDto } from '../kjørelister/types/KjørelisteVisningDto';
import { Rammevedtak } from '../kjørelister/types/Rammevedtak';
import { Person } from '../typer/person';
import { RegisterAktivitet, RegisterAktiviteterResponse } from '../typer/registerAktivitet';
import { SkjematypeFyllUt } from '../typer/skjematype';
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

const er401Feil = (error: unknown): boolean =>
    axios.isAxiosError(error) && error.response?.status === 401;

const redirectTilInnlogging = () => {
    window.location.href = Environment().wonderwallUrl + window.location.href;
};

const erServerfeilEllerNede = (error: unknown): boolean => {
    if (!axios.isAxiosError(error) || axios.isCancel(error)) {
        return false;
    }

    return error.response ? error.response.status >= 500 : true;
};

export const utførApiKall = async <T>(kall: () => Promise<T>): Promise<T> => {
    try {
        return await kall();
    } catch (error) {
        if (er401Feil(error)) {
            redirectTilInnlogging();
        } else if (erServerfeilEllerNede(error)) {
            triggGlobalFeil();
        }
        throw error;
    }
};

export const hentPersonData = (medBarn: boolean): Promise<Person> =>
    utførApiKall(async () => {
        const url = `${Environment().apiProxyUrl}/person${medBarn ? '/med-barn' : ''}`;
        const response = await axios.get<Person>(url, defaultConfig());
        return response.data;
    });

export const hentArbeidsrettedeAktiviteter = (
    skjematype: Skjematype
): Promise<RegisterAktivitet[]> =>
    utførApiKall(async () => {
        const url = `${Environment().apiProxyUrl}/aktivitet`;
        const response = await axios.post<RegisterAktiviteterResponse>(
            url,
            { skjematype },
            defaultConfig()
        );
        return response.data.aktiviteter;
    });

export const hentBehandlingStatus = (skjematype: Skjematype): Promise<boolean> =>
    utførApiKall(async () => {
        const url = `${Environment().apiProxyUrl}/person/har-behandling?skjematype=${encodeURIComponent(skjematype)}`;
        const response = await axios.get<boolean>(url, defaultConfig());
        return response.data;
    });

const skjematypeTilPath = (skjematype: Skjematype): string => {
    switch (skjematype) {
        case Skjematype.SØKNAD_PASS_AV_BARN:
            return 'pass-av-barn';
        case Skjematype.SØKNAD_LÆREMIDLER:
            return 'laremidler';
        case Skjematype.SØKNAD_REISE_TIL_SAMLING:
            return 'reise-til-samling';
        case Skjematype.SØKNAD_STØTTE_TIL_REISE_OPPSTART_AVSLUTNING_HJEMREISE:
            return 'reise-oppstart-avslutning-hjemreise';
    }
};

export const sendInnSøknad = (skjematype: Skjematype, søknad: object): Promise<Kvittering> =>
    utførApiKall(async () => {
        const url = `${Environment().apiProxyUrl}/soknad/${skjematypeTilPath(skjematype)}`;
        const response = await axios.post(url, søknad, defaultConfig());
        return response.data;
    });

interface VedleggResponse {
    data: {
        dokumentId: string;
    };
}

export const lastOppVedlegg = (fil: File): Promise<string> =>
    utførApiKall(async () => {
        const url = `${Environment().vedleggProxyUrl}`;
        const requestData = new FormData();
        requestData.append('file', fil);
        const response = await axios.post<FormData, VedleggResponse>(url, requestData, {
            withCredentials: true,
            headers: {
                'x-request-id': requestId(),
                'Content-Type': 'multipart/form-data',
                accept: 'application/json',
            },
            transformRequest: () => requestData,
        });
        return response.data.dokumentId;
    });

export const hentAlleRammevedtak = (): Promise<Rammevedtak[]> =>
    utførApiKall(async () => {
        const url = `${Environment().apiProxyUrl}/kjorelister/alle-rammevedtak`;
        const response = await axios.get<Rammevedtak[]>(url, defaultConfig());
        return response.data;
    });

export const hentRammevedtak = (reiseId: string): Promise<Rammevedtak> =>
    utførApiKall(async () => {
        const url = `${Environment().apiProxyUrl}/kjorelister/rammevedtak/${reiseId}`;
        const response = await axios.get<Rammevedtak>(url, defaultConfig());
        return response.data;
    });

export const hentTidligereInnsendt = (reiseId: string): Promise<KjørelisteVisningDto | null> =>
    utførApiKall(async () => {
        const url = `${Environment().apiProxyUrl}/kjorelister/${reiseId}`;
        const response = await axios.get<KjørelisteVisningDto | null>(url, defaultConfig());
        return response.data;
    });

export const sendInnKjøreliste = (kjøreliste: Kjøreliste): Promise<KjørelisteKvittering> =>
    utførApiKall(async () => {
        const url = `${Environment().apiProxyUrl}/kjorelister`;
        const response = await axios.post(url, kjøreliste, defaultConfig());
        return response.data;
    });

export const omdirigerTilFyllut = async (skjematype: SkjematypeFyllUt, versjon?: 'NY' | 'GAMMEL') =>
    utførApiKall(async () => {
        const url = `${Environment().apiProxyUrl}/fyllut-redirect`;
        const response = await axios.post<{ redirectUrl: string }>(
            url,
            { skjematype, versjon },
            defaultConfig()
        );
        window.location.replace(response.data.redirectUrl);
    });
