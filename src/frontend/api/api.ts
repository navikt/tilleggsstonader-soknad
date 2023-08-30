import axios from 'axios';

import Environment from './Environment';
import { Stønadstype } from '../typer/stønadstyper';

const stønadstypeTilPath = (stønadstype: Stønadstype): string => {
    switch (stønadstype) {
        case Stønadstype.barnetilsyn:
            return 'barnetilsyn';
    }
};

export const sendInnSøknad = (stønadstype: Stønadstype, søknad: object) => {
    const url = `${Environment().apiProxyUrl}/soknad/${stønadstypeTilPath(stønadstype)}`;
    return (
        axios
            .post(url, søknad, {
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                withCredentials: true,
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((response: { data: any }) => {
                return response.data;
            })
    );
};
