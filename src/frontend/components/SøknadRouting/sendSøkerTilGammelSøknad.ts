import Environment from '../../api/Environment';
import { Stønadstype } from '../../typer/stønadstyper';

export const sendSøkerTilGammelSøknad = (stønadstype: Stønadstype) => {
    window.location.href = Environment().urlGammelSøknad(stønadstype);
};

export const sendSøkerTilPapirsøknad = (stønadstype: Stønadstype) => {
    window.location.href = Environment().urlPapirsøknad(stønadstype);
};
