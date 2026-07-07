import { useMemo, useState } from 'react';

import createUseContext from 'constate';

import { oppdaterDokumentasjonsbehovForBarnMedPass } from './barnepassDokumentUtil';
import { usePerson } from '../../context/PersonContext';
import { DokumentasjonFelt } from '../../typer/skjema';
import { AktivitetFelles, Hovedytelse } from '../../typer/søknad';
import { Barnepass } from '../typer/barnepass';

const [PassAvBarnSøknadProvider, usePassAvBarnSøknad] = createUseContext(() => {
    PassAvBarnSøknadProvider.displayName = 'SØKNAD_PASS_AV_BARN_PROVIDER';

    const { person } = usePerson();

    const [harBekreftet, settHarBekreftet] = useState<boolean>(false);
    const [hovedytelse, settHovedytelse] = useState<Hovedytelse>();
    const [aktivitet, settAktivitet] = useState<AktivitetFelles>();
    const [valgteBarnIdenter, settValgteBarnIdenter] = useState<string[]>([]);
    const [barnMedBarnepass, settBarnMedBarnepass] = useState<Barnepass[]>([]);
    const dokumentasjonsbehov = useMemo(
        () => oppdaterDokumentasjonsbehovForBarnMedPass(barnMedBarnepass, person.barn, []),
        [barnMedBarnepass, person.barn]
    );
    const [dokumentasjon, settDokumentasjon] = useState<DokumentasjonFelt[]>([]);

    const resetSøknad = () => {
        settHarBekreftet(false);
        settHovedytelse(undefined);
        settAktivitet(undefined);
        settValgteBarnIdenter([]);
        settBarnMedBarnepass([]);
        settDokumentasjon([]);
    };

    return {
        harBekreftet,
        settHarBekreftet,
        hovedytelse,
        settHovedytelse,
        aktivitet,
        settAktivitet,
        valgteBarnIdenter,
        settValgteBarnIdenter,
        barnMedBarnepass,
        settBarnMedBarnepass,
        dokumentasjonsbehov,
        dokumentasjon,
        settDokumentasjon,
        resetSøknad,
    };
});

export { PassAvBarnSøknadProvider, usePassAvBarnSøknad };
