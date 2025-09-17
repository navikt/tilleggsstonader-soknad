import React from 'react';

import { RouteKjørelste } from '../../routesKjørelistes';
import KjørelisteNavigasjonsKnapper from '../KjørelisteNavigasjonsKnapper';

const Vedleggside = () => {
    return (
        <>
            <p>Vedleggside</p>
            <KjørelisteNavigasjonsKnapper
                nesteRoute={RouteKjørelste.KVITTERING}
                forrigeRoute={RouteKjørelste.SKJEMA}
            />
        </>
    );
};

export default Vedleggside;
