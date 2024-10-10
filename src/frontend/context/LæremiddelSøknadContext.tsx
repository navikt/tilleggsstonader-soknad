import { useState } from 'react';

import createUseContext from 'constate';

import { Utdanning } from '../læremidler/typer/søknad';
import { DokumentasjonFelt, Dokumentasjonsbehov } from '../typer/skjema';
import { Hovedytelse } from '../typer/søknad';

const [LæremidlerSøknadProvider, useLæremidlerSøknad] = createUseContext(() => {
    LæremidlerSøknadProvider.displayName = 'SØKNAD_LÆREMIDLER_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);

    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();

    const [utdanning, settUtdanning] = useState<Utdanning>();

    const [dokumentasjonsbehov, settDokumentasjonsbehov] = useState<Dokumentasjonsbehov[]>([]);
    const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([]);

    const resetSøknad = () => {
        settHovedytelse(undefined);
        settUtdanning(undefined);
        settDokumentasjonsbehov([]);
        settDokumentasjon([]);
        settHarBekreftet(false);
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        utdanning,
        settUtdanning,
        dokumentasjonsbehov,
        settDokumentasjonsbehov,
        dokumentasjon,
        settDokumentasjon,
        resetSøknad,
    };
});

export { LæremidlerSøknadProvider, useLæremidlerSøknad };
