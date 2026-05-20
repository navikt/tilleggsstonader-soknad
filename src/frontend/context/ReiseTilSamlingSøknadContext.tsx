import { useState } from 'react';

import createUseContext from 'constate';

import { Aktivitet, Hovedytelse } from '../typer/søknad';

const [ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad] = createUseContext(() => {
    ReiseTilSamlingSøknadProvider.displayName = 'SØKNAD_REISE_TIL_SAMLING_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();
    const [aktivitet, settAktivitet] = useState<Aktivitet>();

    const resetSøknad = () => {
        settHarBekreftet(false);
        settHovedytelse(undefined);
        settAktivitet(undefined);
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        aktivitet,
        settAktivitet,
        resetSøknad,
    };
});

export { ReiseTilSamlingSøknadProvider, useReiseTilSamlingSøknad };
