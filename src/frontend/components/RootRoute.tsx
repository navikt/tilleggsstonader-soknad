import React, { useState } from 'react';

import HarBehandlingSide from '../barnetilsyn/HarBehandlingSide';
import { usePerson } from '../context/PersonContext';
import { useSøknad } from '../context/SøknadContext';

interface RootRouteProps {
    forside: React.ReactNode;
}

export const RootRoute: React.FC<RootRouteProps> = ({ forside }) => {
    const { harBehandling } = usePerson();
    const { stønadstype } = useSøknad();
    const [visHarBehandlingSide, settVisHarBehandlingSide] = useState<boolean>(harBehandling);
    if (visHarBehandlingSide) {
        return (
            <HarBehandlingSide
                stønadstype={stønadstype}
                startSøknad={() => settVisHarBehandlingSide(false)}
            ></HarBehandlingSide>
        );
    }

    return forside;
};
