import React from 'react';

import { useLocation } from 'react-router-dom';

import { Forside } from './Forside';
import { NesteStegPlaceholder } from './NesteStegPlaceholder';
import { forsideTekster } from './tekster/forside';
import { SøknadsskjemaHeader } from '../components/SøknadsskjemaHeader';
import { stønadstypeTilSkjemaId } from '../typer/skjemanavn';
import { Stønadstype } from '../typer/stønadstyper';
import { RouteTilPath } from './routing/routesReiseTilSamling';

const Søknadsdialog: React.FC = () => {
    const location = useLocation();

    return (
        <>
            <SøknadsskjemaHeader
                tittel={forsideTekster.banner_tittel}
                skjemaId={stønadstypeTilSkjemaId[Stønadstype.REISE_TIL_SAMLING]}
            />
            {location.pathname.endsWith(RouteTilPath.PLACEHOLDER) ? (
                <NesteStegPlaceholder />
            ) : (
                <Forside />
            )}
        </>
    );
};

export default Søknadsdialog;
