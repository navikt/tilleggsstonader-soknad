import React from 'react';

import { Accordion, BodyShort, VStack } from '@navikt/ds-react';

import KjørelisteDag from './KjørelisteDag';
import { finnDagerMellomFomOgTomInklusiv, tilDagMåned } from '../../utils/datoUtils';
import { RammevedtakUke } from '../types/Rammevedtak';

const KjørelisteUke: React.FC<{ uke: RammevedtakUke }> = ({ uke }) => {
    const dager = finnDagerMellomFomOgTomInklusiv(uke.fom, uke.tom);

    return (
        <Accordion.Item>
            <Accordion.Header>{`Uke ${uke.ukeNummer} (${tilDagMåned(uke.fom)} - ${tilDagMåned(uke.tom)}) [Påbegynt]`}</Accordion.Header>
            <Accordion.Content>
                <VStack gap={'2'}>
                    <BodyShort weight={'semibold'}>Hvilke dager kørte du?</BodyShort>
                    {dager.map((dato) => (
                        <KjørelisteDag dato={dato} />
                    ))}
                </VStack>
            </Accordion.Content>
        </Accordion.Item>
    );
};

export default KjørelisteUke;
