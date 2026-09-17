import React from 'react';

import { Navigate } from 'react-router';

import { RouteTilPath } from '../routing/routesReiseTilSamling';

interface Props {
    harBekreftet: boolean;
    children: React.ReactElement;
}

export const RedirectTilStart: React.FC<Props> = ({ harBekreftet, children }) => {
    return !harBekreftet ? <Navigate to={RouteTilPath.FORSIDE} /> : children;
};
