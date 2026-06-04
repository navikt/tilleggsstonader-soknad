import { Environment } from '../../api/Environment';
import { Skjematype } from '../../typer/skjematyper';

export function sendSøkerTilPapirsøknad(skjematype: Skjematype) {
    window.location.replace(Environment().urlPapirsøknad(skjematype));
}
