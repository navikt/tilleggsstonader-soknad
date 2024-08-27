import { useState } from 'react';

import createUseContext from 'constate';

import { Hovedytelse } from '../typer/søknad';
import { Valideringsfeil } from '../typer/validering';

const [LæremidlerSøknadProvider, useLæremidlerSøknad] = createUseContext(() => {
    LæremidlerSøknadProvider.displayName = 'SØKNAD_LÆREMIDLER_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);

    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();

    // TODO: Håndter dokumentasjon
    // const [dokumentasjonsbehov, settDokumentasjonsbehov] = useState<Dokumentasjonsbehov[]>([]);
    // const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([]);

    const [valideringsfeil, settValideringsfeil] = useState<Valideringsfeil>({});

    const resetSøknad = () => {
        settHovedytelse(undefined);
        // settDokumentasjonsbehov([]);
        // settDokumentasjon([]);
        settValideringsfeil({});
        settHarBekreftet(false);
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        valideringsfeil,
        settValideringsfeil,
        resetSøknad,
    };
});

export { LæremidlerSøknadProvider, useLæremidlerSøknad };
