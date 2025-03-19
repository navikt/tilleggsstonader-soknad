import Environment from '../../api/Environment';
import { StønadstypeRouting } from '../../typer/stønadstyper';

interface RedirectTilNyFyllUtSendInnAppProps {
    stønadstype: StønadstypeRouting;
}

export function RedirectTilNyFyllUtSendInnApp({ stønadstype }: RedirectTilNyFyllUtSendInnAppProps) {
    const env = Environment();

    window.location.replace(env.urlNyFyllUtSøknad(stønadstype));

    return null;
}
