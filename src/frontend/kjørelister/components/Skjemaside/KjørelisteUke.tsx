import React from 'react';

import styled from 'styled-components';

import { Accordion, Alert, BodyShort, HStack, Tag, VStack } from '@navikt/ds-react';

import KjørelisteDag from './KjørelisteDag';
import { erHelg, finnDagerMellomFomOgTomInklusiv, tilTekstligDato } from '../../../utils/datoUtils';
import { useKjøreliste } from '../../KjørelisteContext';
import { harRegistertDataForUke } from '../../kjørelisteUtils';
import { RammevedtakUke } from '../../types/Rammevedtak';

const StyledHeader = styled(Accordion.Header)`
    .navds-accordion__header-content {
        width: 100%;
    }
`;

const KjørelisteUke: React.FC<{ uke: RammevedtakUke }> = ({ uke }) => {
    const dagerIUka = finnDagerMellomFomOgTomInklusiv(uke.fom, uke.tom);

    const { kjøreliste } = useKjøreliste();

    function harValgtHelgedag(dagerIUka: Date[]) {
        const helgedagerDenneUka = dagerIUka.filter((dag) => erHelg(dag));
        return helgedagerDenneUka.some((dag) => kjøreliste.reisedager[dag.toISOString()].harReist);
    }

    return (
        <Accordion.Item>
            <StyledHeader>
                <HStack justify={'space-between'}>
                    <HStack gap={'2'}>
                        <BodyShort size={'large'} weight={'semibold'}>
                            {`Uke ${uke.ukeNummer}`}
                        </BodyShort>
                        <BodyShort>{`(${tilTekstligDato(uke.fom)} - ${tilTekstligDato(uke.tom)})`}</BodyShort>
                    </HStack>
                    {harRegistertDataForUke(dagerIUka, kjøreliste) ? (
                        <Tag variant={'warning'} size={'small'}>
                            Påbegynt
                        </Tag>
                    ) : (
                        <Tag variant={'neutral'} size={'small'}>
                            Ikke utfylt
                        </Tag>
                    )}
                </HStack>
            </StyledHeader>
            <Accordion.Content>
                <VStack gap={'2'}>
                    <BodyShort weight={'semibold'}>Hvilke dager kjørte du?</BodyShort>
                    {dagerIUka.map((dato) => (
                        <KjørelisteDag key={dato.toISOString()} dato={dato} />
                    ))}
                    {harValgtHelgedag(dagerIUka) && (
                        <Alert variant="warning">
                            Du har fylt inn at du har kjørt på en helgedag. Hvis det stemmer at du
                            har kjørt denne dagen vil en saksbehandler manuelt behandle saken din.
                        </Alert>
                    )}
                </VStack>
            </Accordion.Content>
        </Accordion.Item>
    );
};

export default KjørelisteUke;
