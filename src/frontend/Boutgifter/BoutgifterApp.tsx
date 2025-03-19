import { RedirectTilNyFyllUtSendInnApp } from '../components/SøknadRouting/SendBrukerTilNyFyllUtSøknad';
import SøknadRouting from '../components/SøknadRouting/SøknadRouting';
import { StønadstypeRouting } from '../typer/stønadstyper';

export function BoutgifterApp() {
    return (
        <SøknadRouting stønadstype={StønadstypeRouting.BOUTGIFTER}>
            <RedirectTilNyFyllUtSendInnApp stønadstype={StønadstypeRouting.BOUTGIFTER} />
        </SøknadRouting>
    );
}
