import constate from 'constate';

import { Søknad } from '../typer/søknad';

interface Props {
    søknad: Søknad;
    resetSøknad: () => void;
    resetValideringsfeil: () => void;
}

const [SøknadProvider, useSøknad] = constate(
    ({ søknad, resetSøknad, resetValideringsfeil }: Props) => {
        SøknadProvider.displayName = 'SØKNAD_PROVIDER';

        const resetSøknadOgValideringsfeil = () => {
            resetSøknad();
            resetValideringsfeil();
        };

        return {
            søknad,
            resetSøknadOgValideringsfeil,
        };
    }
);

export { SøknadProvider, useSøknad };
