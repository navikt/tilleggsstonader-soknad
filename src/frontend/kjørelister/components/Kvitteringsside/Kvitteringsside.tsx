import React from 'react';

import { RouteKjørelste } from '../../routesKjørelistes';
import KjørelisteNavigasjonsKnapper from '../KjørelisteNavigasjonsKnapper';

const Kvitteringsside = () => {
    return (
        <>
            <p>Kvitteringsside</p>
            <KjørelisteNavigasjonsKnapper
                nesteRoute={RouteKjørelste.LANDINGSSIDE}
                forrigeRoute={RouteKjørelste.VEDLEGG}
            />
        </>
    );
};

export default Kvitteringsside;
