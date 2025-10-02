import Environment from '../../api/Environment';
import { Stønadstype, SkjematypeFyllUt } from '../../typer/stønadstyper';

export const sendSøkerTilGammelSøknad = (stønadstype: SkjematypeFyllUt) => {
    window.location.href = Environment().urlGammelSøknad(stønadstype);
};

export const sendSøkerTilPapirsøknad = (stønadstype: Stønadstype) => {
    window.location.href = Environment().urlPapirsøknad(stønadstype);
};
