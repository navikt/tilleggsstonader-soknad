import React from 'react';

import { useFlyttingSøknad } from './context/FlyttingSøknadContext';
import { routesFlytting } from './routing/routesFlytting';
import { forsideTekster } from './tekster/forside';
import { ForsideSide } from '../components/Forside/ForsideSide';
import { Skjematype } from '../typer/skjematyper';

export const Forside: React.FC = () => {
    const { harBekreftet, settHarBekreftet } = useFlyttingSøknad();

    return (
        <ForsideSide
            skjematype={Skjematype.SØKNAD_FLYTTING}
            routes={routesFlytting}
            tekster={forsideTekster}
            harBekreftet={harBekreftet}
            settHarBekreftet={settHarBekreftet}
        />
    );
};
