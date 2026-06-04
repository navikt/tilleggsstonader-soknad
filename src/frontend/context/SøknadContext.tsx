import constate from 'constate';

import { Skjematype } from '../typer/skjematyper';
import { Søknad } from '../typer/søknad';

interface Props {
    skjematype: Skjematype;
    søknad: Søknad;
    resetSøknad: () => void;
    resetValideringsfeil: () => void;
}

const [SøknadProvider, useSøknad] = constate(
    ({ skjematype, søknad, resetSøknad, resetValideringsfeil }: Props) => {
        SøknadProvider.displayName = 'SØKNAD_PROVIDER';

        const resetSøknadOgValideringsfeil = () => {
            resetSøknad();
            resetValideringsfeil();
        };

        return {
            skjematype,
            søknad,
            resetSøknadOgValideringsfeil,
        };
    }
);

export { SøknadProvider, useSøknad };
