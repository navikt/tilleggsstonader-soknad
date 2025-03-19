import Environment from '../../api/Environment';
import { Stønadstype, StønadstypeRouting } from '../../typer/stønadstyper';

export const sendSøkerTilGammelSøknad = (stønadstype: StønadstypeRouting) => {
    window.location.href = Environment().urlGammelSøknad(stønadstype);
};

export const sendSøkerTilPapirsøknad = (stønadstype: Stønadstype) => {
    window.location.href = Environment().urlPapirsøknad(stønadstype);
};
