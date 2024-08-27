import { useState } from 'react';

import createUseContext from 'constate';

import { Barnepass } from '../typer/barn';
import { DokumentasjonFelt, Dokumentasjonsbehov } from '../typer/skjema';
import { Aktivitet, Hovedytelse } from '../typer/søknad';

const [PassAvBarnSøknadProvider, usePassAvBarnSøknad] = createUseContext(() => {
    PassAvBarnSøknadProvider.displayName = 'SØKNAD_PASS_AV_BARN_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);

    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();

    const [aktivitet, settAktivitet] = useState<Aktivitet>();

    const [valgteBarnIdenter, settValgteBarnIdenter] = useState<string[]>([]);
    const [barnMedBarnepass, settBarnMedBarnepass] = useState<Barnepass[]>([]);

    const [dokumentasjonsbehov, settDokumentasjonsbehov] = useState<Dokumentasjonsbehov[]>([]);

    const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([]);

    const resetSøknad = () => {
        settHovedytelse(undefined);
        settAktivitet(undefined);
        settValgteBarnIdenter([]);
        settBarnMedBarnepass([]);
        settDokumentasjonsbehov([]);
        settDokumentasjon([]);
        settHarBekreftet(false);
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        barnMedBarnepass,
        settBarnMedBarnepass,
        aktivitet,
        settAktivitet,
        dokumentasjonsbehov,
        settDokumentasjonsbehov,
        dokumentasjon,
        settDokumentasjon,
        resetSøknad,
        valgteBarnIdenter,
        settValgteBarnIdenter,
    };
});

export { PassAvBarnSøknadProvider, usePassAvBarnSøknad };
