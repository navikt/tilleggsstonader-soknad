import Environment from '../../api/Environment';
import { Stønadstype, SkjematypeFyllUt } from '../../typer/stønadstyper';

export function sendSøkerTilPapirsøknad(stønadstype: Stønadstype) {
    window.location.replace(Environment().urlPapirsøknad(stønadstype));
}

export function sendBrukerTilFyllUtSøknad(
    skjematypeFyllUt: SkjematypeFyllUt,
    søknadsversjon: 'NY' | 'GAMMEL'
) {
    const env = Environment();

    if (søknadsversjon === 'NY') {
        window.location.replace(env.urlNyFyllUtSøknad(skjematypeFyllUt));
    } else {
        window.location.replace(env.urlGammelSøknad(skjematypeFyllUt));
    }
}
