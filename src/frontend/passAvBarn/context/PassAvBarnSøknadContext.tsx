import createUseContext from 'constate';
import { useMemo, useState } from 'react';
import { usePerson } from '../../context/PersonContext';
import type { DokumentasjonFelt } from '../../typer/skjema';
import type { AktivitetFelles, Hovedytelse } from '../../typer/søknad';
import type { Barnepass } from '../typer/barnepass';
import { oppdaterDokumentasjonsbehovForBarnMedPass } from './barnepassDokumentUtil';

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
        resetSøknad
    };
});

export { PassAvBarnSøknadProvider, usePassAvBarnSøknad };
