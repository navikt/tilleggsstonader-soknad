import { Environment } from '../../api/Environment';
import { Skjematype } from '../../typer/skjematyper';

export function sendSøkerTilPapirsøknad(stønadstype: Skjematype) {
    window.location.replace(Environment().urlPapirsøknad(stønadstype));
}
