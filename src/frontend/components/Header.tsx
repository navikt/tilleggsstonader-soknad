import styled from 'styled-components';

import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { ABreakpointMd } from '@navikt/ds-tokens/dist/tokens';

import LocaleTekst from './Teksthåndtering/LocaleTekst';
import { useSøknad } from '../context/SøknadContext';
import { stønadstypeTilSkjemaId } from '../typer/skjemanavn';
import { TekstElement } from '../typer/tekst';

const Container = styled.div`
    padding: 2rem 1rem 0.5rem 1rem;

    @media (min-width: ${ABreakpointMd}) {
        max-width: 35rem;
        margin: auto;
        padding: 2rem 0 0.5rem 0;
    }
`;

export const Header: React.FC<{ tittel: TekstElement<string> }> = ({ tittel }) => {
    const { stønadstype } = useSøknad();

    return (
        <Container>
            <VStack gap="2">
                <BodyShort>{stønadstypeTilSkjemaId[stønadstype]}</BodyShort>
                <Heading size="xlarge" as="h1">
                    <LocaleTekst tekst={tittel} />
                </Heading>
            </VStack>
        </Container>
    );
};
