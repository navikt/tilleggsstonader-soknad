import { RedirectTilNyFyllUtSendInnApp } from '../components/SkjemaRouting/SendBrukerTilNyFyllUtSøknad';
import { SkjemaRouting } from '../components/SkjemaRouting/SkjemaRouting';
import { SkjematypeFyllUt } from '../typer/stønadstyper';

export function BoutgifterApp() {
    return (
        <SkjemaRouting skjematypeFyllUt={SkjematypeFyllUt.SØKNAD_BOUTGIFTER}>
            <RedirectTilNyFyllUtSendInnApp stønadstype={SkjematypeFyllUt.SØKNAD_BOUTGIFTER} />
        </SkjemaRouting>
    );
}
