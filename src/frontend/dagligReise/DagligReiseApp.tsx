import { RedirectTilNyFyllUtSendInnApp } from '../components/SkjemaRouting/SendBrukerTilNyFyllUtSøknad';
import SkjemaRouting from '../components/SkjemaRouting/SkjemaRouting';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

export function DagligReiseApp() {
    return (
        <SkjemaRouting stønadstype={SkjematypeFyllUt.DAGLIG_REISE}>
            <RedirectTilNyFyllUtSendInnApp stønadstype={SkjematypeFyllUt.DAGLIG_REISE} />
        </SkjemaRouting>
    );
}
