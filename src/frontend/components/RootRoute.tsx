import React, { useState } from 'react';

import Environment from '../api/Environment';
import HarBehandlingSide from '../barnetilsyn/HarBehandlingSide';
import { usePerson } from '../context/PersonContext';
import { Stønadstype } from '../typer/stønadstyper';

interface RootRouteProps {
    stønadstype: Stønadstype;
    forside: React.ReactNode;
}

export const RootRoute: React.FC<RootRouteProps> = ({ stønadstype, forside }) => {
    const { harBehandling } = usePerson();
    const env = Environment();
    const [visHarBehandlingSide, settVisHarBehandlingSide] = useState<boolean>(harBehandling);
    if (visHarBehandlingSide && (env.miljø === 'preprod' || env.miljø === 'local')) {
        return (
            <HarBehandlingSide
                stonadstype={stønadstype}
                startSøknad={() => settVisHarBehandlingSide(false)}
            ></HarBehandlingSide>
        );
    }

    return forside;
};
