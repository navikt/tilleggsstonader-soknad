import React from 'react';

import { Navigate } from 'react-router-dom';

import { useSøknad } from '../context/SøknadContext';
import { Stønadstype } from '../typer/stønadstyper';
import { hentStartRoute } from '../utils/routes';

interface Props {
    stønadstype: Stønadstype;
    children: React.ReactElement;
}

const RedirectTilStart: React.FC<Props> = ({ stønadstype, children }) => {
    const { harBekreftet } = useSøknad();
    return !harBekreftet ? <Navigate to={hentStartRoute(stønadstype)} /> : children;
};

export default RedirectTilStart;
