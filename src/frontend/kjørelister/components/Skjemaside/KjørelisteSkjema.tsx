import React from 'react';

import { VStack } from '@navikt/ds-react';

import { Kjøreliste } from './Kjøreliste';
import { KjørelisteMetadata } from './KjørelisteMetadata';
import { KjørelisteNavigasjonsKnapper } from '../KjørelisteNavigasjonsKnapper';
import { SlikFyllerDuUtKjørelister } from './SlikFyllerDuUtKjørelister';
import { RouteKjørelste } from '../../routesKjørelistes';

export function KjørelisteSkjema() {
    return (
        <VStack gap="8">
            <KjørelisteMetadata />
            <SlikFyllerDuUtKjørelister />
            <Kjøreliste />
            <KjørelisteNavigasjonsKnapper
                nesteRoute={RouteKjørelste.VEDLEGG}
                forrigeRoute={RouteKjørelste.LANDINGSSIDE}
            />
        </VStack>
    );
}
