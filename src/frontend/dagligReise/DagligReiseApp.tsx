import { RedirectTilNyFyllUtSendInnApp } from '../components/SøknadRouting/SendBrukerTilNyFyllUtSøknad';
import SøknadRouting from '../components/SøknadRouting/SøknadRouting';
import { StønadstypeRouting } from '../typer/stønadstyper';

export function DagligReiseApp() {
    return (
        <SøknadRouting stønadstype={StønadstypeRouting.DAGLIG_REISE}>
            <RedirectTilNyFyllUtSendInnApp stønadstype={StønadstypeRouting.DAGLIG_REISE} />
        </SøknadRouting>
    );
}
