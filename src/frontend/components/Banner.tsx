import styled from 'styled-components';

import { Heading } from '@navikt/ds-react';
import { ABlue300, ABlue50 } from '@navikt/ds-tokens/dist/tokens';

import LocaleTekst from './Teksthåndtering/LocaleTekst';
import { TekstElement } from '../typer/tekst';

const Container = styled.div`
    background-color: ${ABlue50};
    height: 3.5rem;
    border-bottom: 0.5rem solid ${ABlue300};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Banner: React.FC<{ tittel: TekstElement<string> }> = ({ tittel }) => {
    return (
        <Container>
            <Heading size="small" as="h1">
                <LocaleTekst tekst={tittel} />
            </Heading>
        </Container>
    );
};
