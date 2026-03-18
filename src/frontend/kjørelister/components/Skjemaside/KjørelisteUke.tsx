import React from 'react';

import { Accordion, Alert, BodyShort, HStack, Tag, VStack } from '@navikt/ds-react';

import { KjørelisteDag } from './KjørelisteDag';
import { useKjøreliste } from '../../KjørelisteContext';
import {
    finnAntallDagerReist,
    harReist,
    harValgtFlereDagerEnnRammevedtak,
    harValgtHelgedag,
} from '../../kjørelisteUtils';
import { UkeMedReisedager } from '../../types/Kjøreliste';
import { WideAccordionHeader } from '../WideAccordionHeader';

export const KjørelisteUke: React.FC<{
    ukeMedReisedag: UkeMedReisedager;
}> = ({ ukeMedReisedag }) => {
    const { rammevedtak } = useKjøreliste();
    const { sendtInnTidligere } = ukeMedReisedag;

    return (
        <Accordion.Item>
            <WideAccordionHeader>
                <HStack justify={'space-between'}>
                    <HStack gap="space-8">{ukeMedReisedag.ukeLabel}</HStack>
                    {sendtInnTidligere ? (
                        <Tag variant={'success'} size={'small'}>
                            Sendt inn
                        </Tag>
                    ) : harReist(ukeMedReisedag.reisedager) ? (
                        <Tag variant={'warning'} size={'small'}>
                            Påbegynt
                        </Tag>
                    ) : (
                        <Tag variant={'neutral'} size={'small'}>
                            Ikke utfylt
                        </Tag>
                    )}
                </HStack>
            </WideAccordionHeader>
            <Accordion.Content>
                <VStack gap="space-8">
                    <BodyShort weight={'semibold'}>{ukeMedReisedag.spørsmål}</BodyShort>
                    {ukeMedReisedag.reisedager.map((reisedag) => (
                        <KjørelisteDag
                            key={reisedag.dato.verdi}
                            reisedag={reisedag}
                            erLesevisning={sendtInnTidligere}
                        />
                    ))}
                    {!sendtInnTidligere && harValgtHelgedag(ukeMedReisedag.reisedager) && (
                        <Alert variant="warning">
                            Du har fylt inn at du har kjørt på en helgedag. Hvis det stemmer at du
                            har kjørt denne dagen vil en saksbehandler manuelt behandle saken din.
                        </Alert>
                    )}
                    {!sendtInnTidligere &&
                        harValgtFlereDagerEnnRammevedtak(
                            rammevedtak,
                            ukeMedReisedag.reisedager
                        ) && (
                            <Alert variant="warning">
                                {`Du har fått innvilget stønad for daglige reiser med egen bil for ${rammevedtak.reisedagerPerUke} dager i uken, men du har registrert ${finnAntallDagerReist(ukeMedReisedag.reisedager)} dager. Sjekk at du har fylt inn alt riktig. Hvis det stemmer at du har kjørt flere dager denne uken vil en saksbehandler manuelt behandle saken din.`}
                            </Alert>
                        )}
                </VStack>
            </Accordion.Content>
        </Accordion.Item>
    );
};
