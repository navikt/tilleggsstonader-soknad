import constate from 'constate';

import { Skjematype } from '../typer/skjematyper';
import { Søknad } from '../typer/søknad';

interface Props {
    stønadstype: Skjematype;
    søknad: Søknad;
    resetSøknad: () => void;
    resetValideringsfeil: () => void;
}

const [SøknadProvider, useSøknad] = constate(
    ({ stønadstype, søknad, resetSøknad, resetValideringsfeil }: Props) => {
        SøknadProvider.displayName = 'SØKNAD_PROVIDER';

        const resetSøknadOgValideringsfeil = () => {
            resetSøknad();
            resetValideringsfeil();
        };

        return {
            stønadstype,
            søknad,
            resetSøknadOgValideringsfeil,
        };
    }
);

export { SøknadProvider, useSøknad };
