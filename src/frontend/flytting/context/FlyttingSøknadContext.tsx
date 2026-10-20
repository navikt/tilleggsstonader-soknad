import { useState } from 'react';

import createUseContext from 'constate';

import { hentDokumentasjonsbehovFlytting } from './flyttingDokumentasjon';
import { initialDokumentasjon, initialHarBekreftet } from './flyttingInitialState';
import { DokumentasjonFelt } from '../../typer/skjema';
import { FlyttingDetaljer } from '../typer/flyttingDetaljer';

const [FlyttingSøknadProvider, useFlyttingSøknad] = createUseContext(() => {
    FlyttingSøknadProvider.displayName = 'SØKNAD_FLYTTING_PROVIDER';
    const [harBekreftet, settHarBekreftet] = useState<boolean>(initialHarBekreftet());
    const [dokumentasjon, settDokumentasjon] =
        useState<DokumentasjonFelt[]>(initialDokumentasjon());
    const [flyttingDetaljer, settFlyttingDetaljer] = useState<FlyttingDetaljer>();
    const dokumentasjonsbehov = hentDokumentasjonsbehovFlytting(flyttingDetaljer);

    const resetSøknad = () => {
        settHarBekreftet(initialHarBekreftet());
        settDokumentasjon(initialDokumentasjon());
        settFlyttingDetaljer(undefined);
    };

    return {
        harBekreftet,
        settHarBekreftet,
        dokumentasjon,
        settDokumentasjon,
        flyttingDetaljer,
        settFlyttingDetaljer,
        dokumentasjonsbehov,
        resetSøknad,
    };
});

export { FlyttingSøknadProvider, useFlyttingSøknad };
