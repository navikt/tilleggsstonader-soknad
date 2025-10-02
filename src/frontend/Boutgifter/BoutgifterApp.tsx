import { RedirectTilNyFyllUtSendInnApp } from '../components/SkjemaRouting/SendBrukerTilNyFyllUtSøknad';
import SkjemaRouting from '../components/SkjemaRouting/SkjemaRouting';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

export function BoutgifterApp() {
    return (
        <SkjemaRouting stønadstype={SkjematypeFyllUt.BOUTGIFTER}>
            <RedirectTilNyFyllUtSendInnApp stønadstype={SkjematypeFyllUt.BOUTGIFTER} />
        </SkjemaRouting>
    );
}
