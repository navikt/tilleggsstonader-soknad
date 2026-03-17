import React from 'react';

import { Box, Checkbox, ErrorMessage } from '@navikt/ds-react';

import LocaleTekst from './Teksthåndtering/LocaleTekst';
import { fellesTekster } from '../tekster/felles';

interface Props {
    skalViseFeilmelding: boolean;
    harBekreftet: boolean;
    oppdaterHarBekreftet: (harBekreftet: boolean) => void;
    fjernFeilmelding: () => void;
}

const BekreftelseCheckbox: React.FC<Props> = ({
    skalViseFeilmelding,
    harBekreftet,
    oppdaterHarBekreftet,
    fjernFeilmelding,
}) => {
    return (
        <Box paddingBlock="space-16 space-32">
            <Checkbox
                checked={harBekreftet}
                onChange={(e) => {
                    oppdaterHarBekreftet(e.target.checked);
                    fjernFeilmelding();
                }}
                error={skalViseFeilmelding}
            >
                <LocaleTekst tekst={fellesTekster.vi_stoler_innhold} />
            </Checkbox>
            {skalViseFeilmelding && (
                <ErrorMessage>
                    <LocaleTekst tekst={fellesTekster.vi_stoler_feilmelding} />
                </ErrorMessage>
            )}
        </Box>
    );
};

export default BekreftelseCheckbox;
