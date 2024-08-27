import React from 'react';

import { Navigate } from 'react-router-dom';

import { Stønadstype } from '../typer/stønadstyper';
import { hentStartRoute } from '../utils/routes';

interface Props {
    harBekreftet: boolean;
    stønadstype: Stønadstype;
    children: React.ReactElement;
}

const RedirectTilStart: React.FC<Props> = ({ harBekreftet, stønadstype, children }) => {
    return !harBekreftet ? <Navigate to={hentStartRoute(stønadstype)} /> : children;
};

export default RedirectTilStart;
