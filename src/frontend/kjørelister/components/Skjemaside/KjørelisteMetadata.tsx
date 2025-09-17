import React from 'react';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';

import { formaterPeriodeTekstlig } from '../../../utils/formateringUtils';
import { useKjøreliste } from '../../KjørelisteContext';

const KjørelisteMetadata = () => {
    const { rammevedtak } = useKjøreliste();
    return (
        <VStack gap={'2'}>
            <Heading size={'medium'}>Denne kjørelisten gjelder</Heading>
            <BodyShort weight={'semibold'}>{rammevedtak.aktivitetsnavn}</BodyShort>
            <BodyShort>{formaterPeriodeTekstlig(rammevedtak.fom, rammevedtak.tom)}</BodyShort>
            <BodyShort>{`Adresse: ${rammevedtak.aktivitetsadresse}`}</BodyShort>
            <BodyShort>{`${rammevedtak.reisedagerPerUke} dager per uke`}</BodyShort>
        </VStack>
    );
};

export default KjørelisteMetadata;
