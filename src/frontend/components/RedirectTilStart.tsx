import React from 'react';

import { Navigate } from 'react-router-dom';

import { useSøknad } from '../context/SøknadContext';
import { hentStartRoute } from '../utils/routeUtils';

interface Props {
    harBekreftet: boolean;
    children: React.ReactElement;
}

const RedirectTilStart: React.FC<Props> = ({ harBekreftet, children }) => {
    const { stønadstype } = useSøknad();

    return !harBekreftet ? <Navigate to={hentStartRoute(stønadstype)} /> : children;
};

export default RedirectTilStart;
