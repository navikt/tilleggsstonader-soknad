import styled from 'styled-components';

import { Accordion } from '@navikt/ds-react';

export const WideAccordionHeader = styled(Accordion.Header)`
    > :last-child {
        flex-grow: 1;
    }
`;
