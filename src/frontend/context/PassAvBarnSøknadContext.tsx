import { useState } from 'react';

import createUseContext from 'constate';

import { Barnepass } from '../typer/barn';
import { DokumentasjonFelt, Dokumentasjonsbehov } from '../typer/skjema';
import { Aktivitet, Hovedytelse } from '../typer/søknad';
import { Valideringsfeil } from '../typer/validering';

const [PassAvBarnSøknadProvider, usePassAvBarnSøknad] = createUseContext(() => {
    PassAvBarnSøknadProvider.displayName = 'SØKNAD_PASS_AV_BARN_PROVIDER';

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);

    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();

    const [aktivitet, settAktivitet] = useState<Aktivitet>();

    const [valgteBarnIdenter, settValgteBarnIdenter] = useState<string[]>([]);
    const [barnMedBarnepass, settBarnMedBarnepass] = useState<Barnepass[]>([]);

    const [dokumentasjonsbehov, settDokumentasjonsbehov] = useState<Dokumentasjonsbehov[]>([]);

    const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([]);

    const [valideringsfeil, settValideringsfeil] = useState<Valideringsfeil>({});

    const resetSøknad = () => {
        settHovedytelse(undefined);
        settAktivitet(undefined);
        settValgteBarnIdenter([]);
        settBarnMedBarnepass([]);
        settDokumentasjonsbehov([]);
        settDokumentasjon([]);
        settValideringsfeil({});
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
        valideringsfeil,
        settValideringsfeil,
        resetSøknad,
        valgteBarnIdenter,
        settValgteBarnIdenter,
    };
});

export { PassAvBarnSøknadProvider, usePassAvBarnSøknad };
