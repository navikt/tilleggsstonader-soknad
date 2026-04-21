import React from 'react';

import { useLocation } from 'react-router-dom';

import { Forside } from './Forside';
import { NesteStegPlaceholder } from './NesteStegPlaceholder';
import { forsideTekster } from './tekster/forside';
import { Header } from '../components/Header';
import { RouteTilPath } from './routing/routesReiseTilSamling';

const Søknadsdialog: React.FC = () => {
    const location = useLocation();

    return (
        <>
            <Header tittel={forsideTekster.banner_tittel} />
            {location.pathname.endsWith(RouteTilPath.PLACEHOLDER) ? (
                <NesteStegPlaceholder />
            ) : (
                <Forside />
            )}
        </>
    );
};

export default Søknadsdialog;
