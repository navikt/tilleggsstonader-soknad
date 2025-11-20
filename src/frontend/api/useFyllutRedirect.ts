import axios from 'axios';

import Environment from './Environment';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

export const omdirigerTilFyllut = async (
    skjematype: SkjematypeFyllUt,
    versjon?: 'NY' | 'GAMMEL'
) => {
    const response = await axios.post<{ redirectUrl: string }>(
        `${Environment().apiProxyUrl}/fyllut-redirect`,
        { skjematype, versjon }
    );
    window.location.replace(response.data.redirectUrl);
};
