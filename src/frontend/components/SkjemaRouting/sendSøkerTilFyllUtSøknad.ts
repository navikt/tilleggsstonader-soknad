import Environment from '../../api/Environment';
import { Stønadstype } from '../../typer/stønadstyper';

export function sendSøkerTilPapirsøknad(stønadstype: Stønadstype) {
    window.location.replace(Environment().urlPapirsøknad(stønadstype));
}
