import React, { useState } from 'react';

import Environment from '../api/Environment';
import HarBehandlingSide from '../barnetilsyn/HarBehandlingSide';
import { usePerson } from '../context/PersonContext';
import { useSøknad } from '../context/SøknadContext';

interface RootRouteProps {
    forside: React.ReactNode;
}

export const RootRoute: React.FC<RootRouteProps> = ({ forside }) => {
    const { harBehandling } = usePerson();
    const { stønadstype } = useSøknad();
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
