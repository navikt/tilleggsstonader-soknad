import React from 'react';

import { Accordion, BodyShort, VStack } from '@navikt/ds-react';

import KjørelisteDag from './KjørelisteDag';

const KjørelisteUke: React.FC<{ uke: number }> = ({ uke }) => {
    return (
        <Accordion.Item>
            <Accordion.Header>{`Uke ${uke} (dato - dato) [Påbegynt]`}</Accordion.Header>
            <Accordion.Content>
                <VStack gap={'2'}>
                    <BodyShort weight={'semibold'}>Hvilke dager kørte du?</BodyShort>
                    <KjørelisteDag />
                    <KjørelisteDag />
                    <KjørelisteDag />
                    <KjørelisteDag />
                    <KjørelisteDag />
                    <KjørelisteDag />
                    <KjørelisteDag />
                </VStack>
            </Accordion.Content>
        </Accordion.Item>
    );
};

export default KjørelisteUke;
