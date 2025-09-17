//TODO alle tekster skal være mulig å oversette
import React from 'react';

import { VStack } from '@navikt/ds-react';

import Kjøreliste from './components/Kjøreliste';
import KjørelisteHeader from './components/KjørelisteHeader';
import KjørelisteMetadata from './components/KjørelisteMetadata';
import KjørelisteNavigasjonsKnapper from './components/KjørelisteNavigasjonsKnapper';
import SlikFyllerDuUtKjørelister from './components/SlikFyllerDuUtKjørelister';

export function KjørelisteSkjema() {
    return (
        <VStack gap="8">
            <KjørelisteHeader />
            <KjørelisteMetadata />
            <SlikFyllerDuUtKjørelister />
            <Kjøreliste />
            <KjørelisteNavigasjonsKnapper />
        </VStack>
    );
}
