import { RedirectTilNyFyllUtSendInnApp } from '../components/SkjemaRouting/SendBrukerTilNyFyllUtSøknad';
import SkjemaRouting from '../components/SkjemaRouting/SkjemaRouting';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

export function DagligReiseApp() {
    return (
        <SkjemaRouting skjmatypeFyllUt={SkjematypeFyllUt.SØKNAD_DAGLIG_REISE}>
            <RedirectTilNyFyllUtSendInnApp stønadstype={SkjematypeFyllUt.SØKNAD_DAGLIG_REISE} />
        </SkjemaRouting>
    );
}
