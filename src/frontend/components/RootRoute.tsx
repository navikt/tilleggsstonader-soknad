import React, { useEffect, useState } from 'react';

import { loggBesøk } from '../api/analytics';
import { HarBehandlingSide } from '../barnetilsyn/HarBehandlingSide';
import { RoutesBarnetilsyn } from '../barnetilsyn/routing/routesBarnetilsyn';
import { usePerson } from '../context/PersonContext';
import { useSøknad } from '../context/SøknadContext';
import { routesLæremidler } from '../læremidler/routing/routesLæremidler';
import { routesReiseTilSamling } from '../reiseTilSamling/routing/routesReiseTilSamling';
import { IRoute } from '../typer/routes';
import { Skjematype } from '../typer/skjematyper';

interface RootRouteProps {
    forside: React.ReactNode;
}

const route: Record<Skjematype, IRoute> = {
    [Skjematype.SØKNAD_BARNETILSYN]: RoutesBarnetilsyn[0],
    [Skjematype.SØKNAD_LÆREMIDLER]: routesLæremidler[0],
    [Skjematype.SØKNAD_REISE_TIL_SAMLING]: routesReiseTilSamling[0],
};

export const RootRoute: React.FC<RootRouteProps> = ({ forside }) => {
    const { harBehandling } = usePerson();
    const { skjematype } = useSøknad();
    const [visHarBehandlingSide, settVisHarBehandlingSide] = useState<boolean>(harBehandling);

    useEffect(() => {
        loggBesøk(
            skjematype,
            route[skjematype].path,
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
