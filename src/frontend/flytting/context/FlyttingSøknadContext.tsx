import { useState } from 'react';

import createUseContext from 'constate';

import {
    initialDokumentasjon,
    initialHarBekreftet,
    initialHovedytelse,
} from './flyttingInitialState';
import { DokumentasjonFelt } from '../../typer/skjema';
import { Hovedytelse } from '../../typer/søknad';

const [FlyttingSøknadProvider, useFlyttingSøknad] = createUseContext(() => {
    FlyttingSøknadProvider.displayName = 'SØKNAD_FLYTTING_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(initialHarBekreftet());
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse | undefined>(initialHovedytelse());
    const [dokumentasjon, settDokumentasjon] =
        useState<DokumentasjonFelt[]>(initialDokumentasjon());

    const resetSøknad = () => {
        settHarBekreftet(initialHarBekreftet());
        settHovedytelse(initialHovedytelse());
        settDokumentasjon(initialDokumentasjon());
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        dokumentasjon,
        settDokumentasjon,
        resetSøknad,
    };
});

export { FlyttingSøknadProvider, useFlyttingSøknad };
