import React from 'react';

import styled from 'styled-components';

import { Checkbox, TextField, VStack } from '@navikt/ds-react';

import { erHelg } from '../../../utils/datoUtils';
import { useKjøreliste } from '../../KjørelisteContext';
import { Reisedag } from '../../types/Kjøreliste';

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

export const KjørelisteDag: React.FC<{ reisedag: Reisedag }> = ({ reisedag }) => {
    const { oppdaterHarReist, oppdaterParkeringsutgift } = useKjøreliste();

    const erNegativUtgift = (): boolean => (reisedag?.parkeringsutgift?.verdi ?? 0) < 0;

    return (
        <Card graybackground={erHelg(reisedag.dato.verdi).toString()}>
            <Checkbox
                checked={reisedag.harKjørt}
                onChange={(e) => {
                    oppdaterHarReist(reisedag.dato.verdi, e.target.checked);
                }}
            >
                {reisedag.dato.label}
            </Checkbox>
            {reisedag.harKjørt && (
                <StyledTextField
                    id={reisedag.dato.verdi}
                    label={reisedag.parkeringsutgift.label}
                    inputMode={'numeric'}
                    type={'number'}
                    min={0}
                    value={
                        reisedag.parkeringsutgift.verdi !== null &&
                        reisedag.parkeringsutgift.verdi !== undefined
                            ? reisedag.parkeringsutgift.verdi
                            : ''
                    }
                    error={erNegativUtgift() && 'Utgiften må være større enn 0'}
                    onChange={(e) =>
                        oppdaterParkeringsutgift(reisedag.dato.verdi, Number(e.target.value))
                    }
                />
            )}
        </Card>
    );
};
