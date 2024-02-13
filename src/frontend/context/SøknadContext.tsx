import { useState } from 'react';

import createUseContext from 'constate';

import { Barnepass } from '../typer/barn';
import { DokumentasjonFelt } from '../typer/skjema';
import { Aktivitet, Hovedytelse } from '../typer/søknad';

const [SøknadProvider, useSøknad] = createUseContext(() => {
    SøknadProvider.displayName = 'SØKNAD_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);

    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();
    const [aktivitet, settAktivitet] = useState<Aktivitet>();

    const [barnMedBarnepass, settBarnMedBarnepass] = useState<Barnepass[]>([]);
    const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([]);

    const [innsentTidspunkt, settInnsentTidspunkt] = useState<Date>();

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        barnMedBarnepass,
        settBarnMedBarnepass,
        aktivitet,
        settAktivitet,
        dokumentasjon,
        settDokumentasjon,
        innsentTidspunkt,
        settInnsentTidspunkt,
    };
});

export { SøknadProvider, useSøknad };
