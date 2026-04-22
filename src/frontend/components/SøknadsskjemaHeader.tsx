import styled from 'styled-components';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { BreakpointMdDown } from '@navikt/ds-tokens/js';

import LocaleTekst from './Teksthåndtering/LocaleTekst';
import { TekstElement } from '../typer/tekst';

const Container = styled.div`
    padding: 2rem 1rem 0.5rem 1rem;

    @media (min-width: ${BreakpointMdDown}) {
        max-width: 35rem;
        margin: auto;
        padding: 2rem 0 0.5rem 0;
    }
`;

export const SøknadsskjemaHeader: React.FC<{ tittel: TekstElement<string>; skjemaId: string }> = ({
    tittel,
    skjemaId,
}) => {
    return (
        <Container>
            <VStack gap="space-8">
                <BodyShort>{skjemaId}</BodyShort>
                <Heading size="xlarge" as="h1">
                    <LocaleTekst tekst={tittel} />
                </Heading>
            </VStack>
        </Container>
    );
};
