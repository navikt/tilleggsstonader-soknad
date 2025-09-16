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
    const { kjøreliste, oppdaterSkalReise, oppdaterParkeringsutgift } = useKjøreliste();

    const [skalKjøre, settSkalKjøre] = useState(
        kjøreliste.reisedager[dato.toISOString()].skalReise
    );
    return (
        <Card graybackground={erHelg(dato).toString()}>
            <Checkbox
                checked={skalKjøre}
                onChange={(e) => {
                    settSkalKjøre(e.target.checked);
                    oppdaterSkalReise(dato, e.target.checked);
                }}
            >{`${tilUkedag(dato)} ${tilDagMåned(dato.toISOString())}`}</Checkbox>
            {skalKjøre && (
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
