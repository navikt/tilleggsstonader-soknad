import React from 'react';

import { Navigate } from 'react-router-dom';

import { usePassAvBarnSøknad } from '../context/PassAvBarnSøknadContext';
import { Stønadstype } from '../typer/stønadstyper';
import { hentStartRoute } from '../utils/routes';

interface Props {
    stønadstype: Stønadstype;
    children: React.ReactElement;
}

const RedirectTilStart: React.FC<Props> = ({ stønadstype, children }) => {
    const { harBekreftet } = usePassAvBarnSøknad();
    return !harBekreftet ? <Navigate to={hentStartRoute(stønadstype)} /> : children;
};

export default RedirectTilStart;
