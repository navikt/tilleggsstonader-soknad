import React, { useState } from 'react';

import HarBehandlingSide from '../barnetilsyn/HarBehandlingSide';
import { usePerson } from '../context/PersonContext';
import { Stønadstype } from '../typer/stønadstyper';

interface RootRouteProps {
    stønadstype: Stønadstype;
    forside: React.ReactNode;
}

export const RootRoute: React.FC<RootRouteProps> = ({ stønadstype, forside }) => {
    const { harBehandling } = usePerson();
    const [visHarBehandlingSide, settVisHarBehandlingSide] = useState<boolean>(harBehandling);
    if (visHarBehandlingSide) {
        return (
            <HarBehandlingSide
                stonadstype={stønadstype}
                startSøknad={() => settVisHarBehandlingSide(false)}
            ></HarBehandlingSide>
        );
    }

    return forside;
};
