import React from 'react';

import styled from 'styled-components';

import { Accordion, BodyShort, HStack, Tag, VStack } from '@navikt/ds-react';

import KjørelisteDag from './KjørelisteDag';
import { finnDagerMellomFomOgTomInklusiv, tilDagMåned } from '../../utils/datoUtils';
import { RammevedtakUke } from '../types/Rammevedtak';

const StyledHeader = styled(Accordion.Header)`
    .navds-accordion__header-content {
        width: 100%;
    }
`;
const KjørelisteUke: React.FC<{ uke: RammevedtakUke }> = ({ uke }) => {
    const dager = finnDagerMellomFomOgTomInklusiv(uke.fom, uke.tom);

    return (
        <Accordion.Item>
            <StyledHeader>
                <HStack justify={'space-between'}>
                    <HStack gap={'2'}>
                        <BodyShort size={'large'} weight={'semibold'}>
                            {`Uke ${uke.ukeNummer}`}
                        </BodyShort>
                        <BodyShort>{`(${tilDagMåned(uke.fom)} - ${tilDagMåned(uke.tom)})`}</BodyShort>
                    </HStack>
                    <Tag variant={'neutral'} size={'small'}>
                        Ikke utfylt
                    </Tag>
                </HStack>
            </StyledHeader>
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
