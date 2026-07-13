import React, { useEffect, useState } from 'react';

import { loggBesøk } from '../api/analytics';
import { usePerson } from '../context/PersonContext';
import { useSøknad } from '../context/SøknadContext';
import { HarBehandlingSide } from '../passAvBarn/HarBehandlingSide';
import { hentRoutes } from '../utils/routeUtils';

interface RootRouteProps {
    forside: React.ReactNode;
}

export const RootRoute: React.FC<RootRouteProps> = ({ forside }) => {
    const { harBehandling } = usePerson();
    const { skjematype } = useSøknad();
    const [visHarBehandlingSide, settVisHarBehandlingSide] = useState<boolean>(harBehandling);

    useEffect(() => {
        loggBesøk(
            skjematype,
            hentRoutes(skjematype)[0].path,
            `Forside - harBehandling=${harBehandling ? 'Ja' : 'Nei'}`
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (visHarBehandlingSide) {
        return (
            <HarBehandlingSide
                skjematype={skjematype}
                startSøknad={() => settVisHarBehandlingSide(false)}
            ></HarBehandlingSide>
        );
    }

    return forside;
};
