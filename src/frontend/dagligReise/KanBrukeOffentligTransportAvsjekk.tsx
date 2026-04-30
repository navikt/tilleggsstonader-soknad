import React from 'react';

import { DagligReiseAvsjekk } from './DagligReiseAvsjekk';
import { dagligReiseTekster } from './offentligTransportAvsjekkTekster';

export const KanBrukeOffentligTransportAvsjekk: React.FC = () => (
    <DagligReiseAvsjekk
        tekster={dagligReiseTekster}
        legend={'Kan du reise med offentlig transport hele veien?'}
        description={'Med offentlig transport menes buss, tog, trikk, t-bane, ferge og lignende.'}
        jaBetyrNyLøsning={true}
    />
);
