import { useState } from 'react';

import createUseContext from 'constate';

import { BarnMedBarnepass } from '../typer/barn';
import { Hovedytelse } from '../typer/søknad';

const [SøknadProvider, useSøknad] = createUseContext(() => {
    SøknadProvider.displayName = 'SØKNAD_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);

    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();

    const [barnMedBarnepass, settBarnMedBarnepass] = useState<BarnMedBarnepass[]>([]);

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        barnMedBarnepass,
        settBarnMedBarnepass,
    };
});

export { SøknadProvider, useSøknad };
