import { useState } from 'react';

import createUseContext from 'constate';

import { Barnepass } from '../typer/barn';
import { DokumentasjonFelt } from '../typer/skjema';
import { Aktivitet, Hovedytelse } from '../typer/søknad';
import { Valideringsfeil } from '../typer/validering';

const [SøknadProvider, useSøknad] = createUseContext(() => {
    SøknadProvider.displayName = 'SØKNAD_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);

    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();
    const [aktivitet, settAktivitet] = useState<Aktivitet>();

    const [barnMedBarnepass, settBarnMedBarnepass] = useState<Barnepass[]>([]);
    const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([]);

    const [innsentTidspunkt, settInnsentTidspunkt] = useState<string>();

    const [valideringsfeil, settValideringsfeil] = useState<Valideringsfeil>({});

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
        valideringsfeil,
        settValideringsfeil,
    };
});

export { SøknadProvider, useSøknad };
