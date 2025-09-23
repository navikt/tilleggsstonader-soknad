import React from 'react';

import { VStack } from '@navikt/ds-react';

import { Kjøreliste } from './Kjøreliste';
import { KjørelisteMetadata } from './KjørelisteMetadata';
import { KjørelisteNavigasjonsKnapper } from '../KjørelisteNavigasjonsKnapper';
import { SlikFyllerDuUtKjørelister } from './SlikFyllerDuUtKjørelister';
import { KjørelisteSider } from '../../kjørelisteSider';

export function KjørelisteSkjema() {
    return (
        <VStack gap="8">
            <KjørelisteMetadata />
            <SlikFyllerDuUtKjørelister />
            <Kjøreliste />
            <KjørelisteNavigasjonsKnapper
                nesteSide={KjørelisteSider.VEDLEGG}
                forrigeSide={KjørelisteSider.LANDINGSSIDE}
            />
        </VStack>
    );
}
