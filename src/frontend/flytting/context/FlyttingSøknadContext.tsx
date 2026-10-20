import { useState } from 'react';

import createUseContext from 'constate';

import { hentDokumentasjonsbehovFlytting } from './flyttingDokumentasjon';
import {
    initialDokumentasjon,
    initialHarBekreftet,
    initialHovedytelse,
} from './flyttingInitialState';
import { DokumentasjonFelt } from '../../typer/skjema';
import { Hovedytelse } from '../../typer/søknad';
import { FlyttingDetaljer } from '../typer/flyttingDetaljer';

const [FlyttingSøknadProvider, useFlyttingSøknad] = createUseContext(() => {
    FlyttingSøknadProvider.displayName = 'SØKNAD_FLYTTING_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(initialHarBekreftet());
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse | undefined>(initialHovedytelse());
    const [dokumentasjon, settDokumentasjon] =
        useState<DokumentasjonFelt[]>(initialDokumentasjon());
    const [flyttingDetaljer, settFlyttingDetaljer] = useState<FlyttingDetaljer>();
    const dokumentasjonsbehov = hentDokumentasjonsbehovFlytting(flyttingDetaljer);

    const resetSøknad = () => {
        settHarBekreftet(initialHarBekreftet());
        settHovedytelse(initialHovedytelse());
        settDokumentasjon(initialDokumentasjon());
        settFlyttingDetaljer(undefined);
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        dokumentasjon,
        settDokumentasjon,
        flyttingDetaljer,
        settFlyttingDetaljer,
        dokumentasjonsbehov,
        resetSøknad,
    };
});

export { FlyttingSøknadProvider, useFlyttingSøknad };
