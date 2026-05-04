import React from 'react';

import { DagligReiseAvsjekk } from './DagligReiseAvsjekk';
import { taxiAvsjekkTekster } from './taxiAvsjekkTekster';

export const SkalBrukeTaxiAvsjekk: React.FC = () => (
    <DagligReiseAvsjekk
        tekster={taxiAvsjekkTekster}
        legend={'Skal du reise med taxi?'}
        jaBetyrNyLøsning={false}
    />
);
