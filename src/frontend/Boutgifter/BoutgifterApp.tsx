import { RedirectTilNyFyllUtSendInnApp } from '../components/SøknadRouting/SendBrukerTilNyFyllUtSøknad';
import SøknadRouting from '../components/SøknadRouting/SøknadRouting';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

export function BoutgifterApp() {
    return (
        <SøknadRouting stønadstype={SkjematypeFyllUt.BOUTGIFTER}>
            <RedirectTilNyFyllUtSendInnApp stønadstype={SkjematypeFyllUt.BOUTGIFTER} />
        </SøknadRouting>
    );
}
