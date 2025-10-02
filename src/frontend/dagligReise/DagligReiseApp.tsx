import { RedirectTilNyFyllUtSendInnApp } from '../components/SøknadRouting/SendBrukerTilNyFyllUtSøknad';
import SøknadRouting from '../components/SøknadRouting/SøknadRouting';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

export function DagligReiseApp() {
    return (
        <SøknadRouting stønadstype={SkjematypeFyllUt.DAGLIG_REISE}>
            <RedirectTilNyFyllUtSendInnApp stønadstype={SkjematypeFyllUt.DAGLIG_REISE} />
        </SøknadRouting>
    );
}
