import React, { useState } from 'react';

import styled from 'styled-components';

import { Checkbox, TextField, VStack } from '@navikt/ds-react';

import { erHelg, tilTekstligDato, tilUkedag } from '../../../utils/datoUtils';
import { useKjøreliste } from '../../KjørelisteContext';

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

export const KjørelisteDag: React.FC<{ dato: Date }> = ({ dato }) => {
    const { kjøreliste, oppdaterHarReist, oppdaterParkeringsutgift } = useKjøreliste();

    const [harReist, settHarReist] = useState(kjøreliste.reisedager[dato.toISOString()].harReist);

    const erNegativUtgift = (): boolean =>
        (kjøreliste.reisedager[dato.toISOString()].parkeringsutgift ?? 0) < 0;

    return (
        <Card graybackground={erHelg(dato).toString()}>
            <Checkbox
                checked={harReist}
                onChange={(e) => {
                    settHarReist(e.target.checked);
                    oppdaterHarReist(dato, e.target.checked);
                }}
            >{`${tilUkedag(dato)} ${tilTekstligDato(dato.toISOString())}`}</Checkbox>
            {harReist && (
                <StyledTextField
                    id={dato.toISOString()}
                    label={'Parkeringsutgifter (kr)'}
                    inputMode={'numeric'}
                    type={'number'}
                    min={0}
                    error={erNegativUtgift() && 'Utgiften må være et positivt tall'}
                    onChange={(e) => oppdaterParkeringsutgift(dato, Number(e.target.value))}
                />
            )}
        </Card>
    );
};
