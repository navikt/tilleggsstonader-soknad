import { useState } from 'react';

import createUseContext from 'constate';

import { Hovedytelse } from '../typer/søknad';

const [LæremidlerSøknadProvider, useLæremidlerSøknad] = createUseContext(() => {
    LæremidlerSøknadProvider.displayName = 'SØKNAD_LÆREMIDLER_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);

    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();

    // TODO: Håndter dokumentasjon
    // const [dokumentasjonsbehov, settDokumentasjonsbehov] = useState<Dokumentasjonsbehov[]>([]);
    // const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([]);

    const resetSøknad = () => {
        settHovedytelse(undefined);
        // settDokumentasjonsbehov([]);
        // settDokumentasjon([]);
        settHarBekreftet(false);
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        resetSøknad,
    };
});

export { LæremidlerSøknadProvider, useLæremidlerSøknad };
