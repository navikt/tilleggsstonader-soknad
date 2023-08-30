import { useState } from 'react';

import createUseContext from 'constate';

import { Hovedytelse } from '../typer/søknad';

const [SøknadProvider, useSøknad] = createUseContext(() => {
    SøknadProvider.displayName = 'SØKNAD_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);

    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();

    return { harBekreftet, settHarBekreftet, hovedytelse, settHovedytelse };
});

export { SøknadProvider, useSøknad };
