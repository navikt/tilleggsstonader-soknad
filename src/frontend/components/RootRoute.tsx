import React, { useEffect, useState } from 'react';

import { loggBesøk } from '../api/amplitude';
import HarBehandlingSide from '../barnetilsyn/HarBehandlingSide';
import { RoutesBarnetilsyn } from '../barnetilsyn/routing/routesBarnetilsyn';
import { usePerson } from '../context/PersonContext';
import { useSøknad } from '../context/SøknadContext';
import { routesLæremidler } from '../læremidler/routing/routesLæremidler';
import { IRoute } from '../typer/routes';
import { Stønadstype } from '../typer/stønadstyper';

interface RootRouteProps {
    forside: React.ReactNode;
}

const route: Record<Stønadstype, IRoute> = {
    [Stønadstype.BARNETILSYN]: RoutesBarnetilsyn[0],
    [Stønadstype.LÆREMIDLER]: routesLæremidler[0],
};

export const RootRoute: React.FC<RootRouteProps> = ({ forside }) => {
    const { harBehandling } = usePerson();
    const { stønadstype } = useSøknad();
    const [visHarBehandlingSide, settVisHarBehandlingSide] = useState<boolean>(harBehandling);

    useEffect(() => {
        loggBesøk(
            stønadstype,
            route[stønadstype].path,
            `Forside - harBehandling=${harBehandling ? 'Ja' : 'Nei'}`
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
