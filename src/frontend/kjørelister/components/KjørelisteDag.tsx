import React from 'react';

import styled from 'styled-components';

import { Checkbox, TextField, VStack } from '@navikt/ds-react';

const Card = styled(VStack)`
    border: 1px solid black;
    border-radius: 5px;
    padding: 1rem;
`;

const KjørelisteDag = () => {
    return (
        <Card>
            <Checkbox value={'ukedag'}>Ukedag</Checkbox>
            <TextField label={'Parkeringsutgifter (kr)'} inputMode={'numeric'} />
        </Card>
    );
};

export default KjørelisteDag;
