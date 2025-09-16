import React, { useState } from 'react';

import styled from 'styled-components';

import { Checkbox, TextField, VStack } from '@navikt/ds-react';

import { erHelg, tilDagMåned, tilUkedag } from '../../utils/datoUtils';
import { useKjøreliste } from '../KjørelisteContext';

const Card = styled(VStack)<{ graybackground: string }>`
    border: 1px solid black;
    border-radius: 5px;
    padding: 0 1rem;
    background-color: ${({ graybackground }) => (graybackground == 'true' ? 'lightgray' : 'white')};
`;

const StyledTextField = styled(TextField)`
    margin-bottom: 1rem;
    max-width: 12rem;
`;

const KjørelisteDag: React.FC<{ dato: Date }> = ({ dato }) => {
    const { kjøreliste, oppdaterHarReist, oppdaterParkeringsutgift } = useKjøreliste();

    const [harReist, settHarReist] = useState(kjøreliste.reisedager[dato.toISOString()].harReist);
    return (
        <Card graybackground={erHelg(dato).toString()}>
            <Checkbox
                checked={harReist}
                onChange={(e) => {
                    settHarReist(e.target.checked);
                    oppdaterHarReist(dato, e.target.checked);
                }}
            >{`${tilUkedag(dato)} ${tilDagMåned(dato.toISOString())}`}</Checkbox>
            {harReist && (
                <StyledTextField
                    label={'Parkeringsutgifter (kr)'}
                    inputMode={'numeric'}
                    type={'number'}
                    onChange={(e) => oppdaterParkeringsutgift(dato, Number(e.target.value))}
                />
            )}
        </Card>
    );
};

export default KjørelisteDag;
