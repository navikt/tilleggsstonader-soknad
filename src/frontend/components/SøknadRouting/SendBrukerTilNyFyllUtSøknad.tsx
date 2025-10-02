import Environment from '../../api/Environment';
import { SkjematypeFyllUt } from '../../typer/stønadstyper';

interface RedirectTilNyFyllUtSendInnAppProps {
    stønadstype: SkjematypeFyllUt;
}

export function RedirectTilNyFyllUtSendInnApp({ stønadstype }: RedirectTilNyFyllUtSendInnAppProps) {
    const env = Environment();

    window.location.replace(env.urlNyFyllUtSøknad(stønadstype));

    return null;
}
