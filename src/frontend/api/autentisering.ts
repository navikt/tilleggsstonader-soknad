import axios, { AxiosError } from 'axios';

import Environment from './Environment';

const getLoginUrl = () => Environment().wonderwallUrl + getRedirectUrl();

const getRedirectUrl = () => window.location.href;

export const autentiseringsInterceptor = () => {
    axios.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (er401Feil(error)) {
                window.location.href = getLoginUrl();
            } else {
                throw error;
            }
        }
    );
};

const er401Feil = (error: AxiosError) => error && error.response && error.response.status === 401;
