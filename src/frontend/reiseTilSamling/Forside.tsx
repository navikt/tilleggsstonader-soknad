import React from 'react';

import { useReiseTilSamlingSøknad } from './context/ReiseTilSamlingSøknadContext';
import { routesReiseTilSamling } from './routing/routesReiseTilSamling';
import { forsideTekster } from './tekster/forside';
import { ForsideSide } from '../components/Forside/ForsideSide';
import { Skjematype } from '../typer/skjematyper';

export const Forside: React.FC = () => {
    const { harBekreftet, settHarBekreftet } = useReiseTilSamlingSøknad();

    return (
        <ForsideSide
            skjematype={Skjematype.SØKNAD_REISE_TIL_SAMLING}
            routes={routesReiseTilSamling}
            tekster={forsideTekster}
            harBekreftet={harBekreftet}
            settHarBekreftet={settHarBekreftet}
        />
    );
};
