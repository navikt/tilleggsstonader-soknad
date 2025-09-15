import React, { useState } from 'react';

import styled from 'styled-components';

import { Checkbox, TextField, VStack } from '@navikt/ds-react';

import { erHelg, tilDagMåned, tilUkedag } from '../../utils/datoUtils';

const Card = styled(VStack)<{ grayBackground: boolean }>`
    border: 1px solid black;
    border-radius: 5px;
    padding: 0 1rem;
    background-color: ${({ grayBackground }) => (grayBackground ? 'lightgray' : 'white')};
`;

const StyledTextField = styled(TextField)`
    margin-bottom: 1rem;
    max-width: 12rem;
`;

const KjørelisteDag: React.FC<{ dato: Date }> = ({ dato }) => {
    const [skalKjøre, settSkalKjøre] = useState(false);
    return (
        <Card grayBackground={erHelg(dato)}>
            <Checkbox
                value={skalKjøre}
                onChange={(e) => settSkalKjøre(e.target.checked)}
            >{`${tilUkedag(dato)} ${tilDagMåned(dato.toISOString())}`}</Checkbox>
            {skalKjøre && (
                <StyledTextField label={'Parkeringsutgifter (kr)'} inputMode={'numeric'} />
            )}
        </Card>
    );
};

export default KjørelisteDag;
