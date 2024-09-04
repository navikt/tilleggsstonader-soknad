import constate from 'constate';

import { Stønadstype } from '../typer/stønadstyper';
import { Søknad } from '../typer/søknad';

interface Props {
    stønadstype: Stønadstype;
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
