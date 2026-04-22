import { useState } from 'react';

import createUseContext from 'constate';

import { Hovedytelse } from '../typer/søknad';

const [ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad] = createUseContext(() => {
    ReiseTilSamlingSøknadProvider.displayName = 'SØKNAD_REISE_TIL_SAMLING_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();

    const resetSøknad = () => {
        settHarBekreftet(false);
        settHovedytelse(undefined);
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        resetSøknad,
    };
});

export { ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad };
