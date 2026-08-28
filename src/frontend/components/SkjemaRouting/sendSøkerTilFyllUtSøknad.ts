import { Environment } from '../../api/Environment';
import type { Skjematype } from '../../typer/skjematyper';

export function sendSøkerTilPapirsøknad(skjematype: Skjematype) {
    window.location.replace(Environment().urlPapirsøknad(skjematype));
}
