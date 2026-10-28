import React from 'react';

import { useReiseOppstartAvslutningHjemreiseSøknad } from './context/ReiseOppstartAvslutningHjemreiseSøknadContext';
import { routesReiseOppstartAvslutningHjemreise } from './routing/routesReiseOppstartAvslutningHjemreise';
import { forsideTekster } from './tekster/forside';
import { ForsideSide } from '../components/Forside/ForsideSide';
import { Skjematype } from '../typer/skjematyper';

export const Forside: React.FC = () => {
    const { harBekreftet, settHarBekreftet } = useReiseOppstartAvslutningHjemreiseSøknad();

    return (
        <ForsideSide
            skjematype={Skjematype.SØKNAD_REISE_OPPSTART_AVSLUTNING_HJEMREISE}
            routes={routesReiseOppstartAvslutningHjemreise}
            tekster={forsideTekster}
            harBekreftet={harBekreftet}
            settHarBekreftet={settHarBekreftet}
        />
    );
};
