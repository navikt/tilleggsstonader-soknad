import { Accordion } from '@navikt/ds-react';
import styled from 'styled-components';

export const WideAccordionHeader = styled(Accordion.Header)`
    > :last-child {
        flex-grow: 1;
    }
`;
