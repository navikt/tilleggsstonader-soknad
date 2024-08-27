import React from 'react';

import { CheckboxGroup, Checkbox } from '@navikt/ds-react';

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
        <CheckboxGroup
            legend={<LocaleTekst tekst={fellesTekster.vi_stoler_tittel} />}
            error={
                skalViseFeilmelding && <LocaleTekst tekst={fellesTekster.vi_stoler_feilmelding} />
            }
            value={[harBekreftet]}
        >
            <Checkbox
                value={true}
                onChange={(e) => {
                    oppdaterHarBekreftet(e.target.checked);
                    fjernFeilmelding();
                }}
            >
                <LocaleTekst tekst={fellesTekster.vi_stoler_innhold} />
            </Checkbox>
        </CheckboxGroup>
    );
};

export default BekreftelseCheckbox;
