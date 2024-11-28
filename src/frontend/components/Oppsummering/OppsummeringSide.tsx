import React, { ReactNode, useState } from 'react';

import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { fellesOppsummeringTekster } from '../../tekster/oppsummering';
import Side from '../Side';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

export const OppsummeringSide = ({ children }: { children: ReactNode }) => {
    const { locale } = useSpråk();
    const [harBekreftet, settHarBekreftet] = useState(false);
    const [feilBekreftet, settFeilBekreftet] = useState<string>();

    return (
        <Side
            validerSteg={() => {
                if (!harBekreftet) {
                    settFeilBekreftet(fellesOppsummeringTekster.bekreft.feil[locale]);
                    return false;
                }
                settFeilBekreftet('');
                return true;
            }}
        >
            {children}
            <CheckboxGroup
                value={[harBekreftet]}
                onChange={(verdier) => {
                    settHarBekreftet(verdier.includes(true));
                    settFeilBekreftet(undefined);
                }}
                legend={<LocaleTekst tekst={fellesOppsummeringTekster.bekreft.tittel} />}
                hideLegend
                error={feilBekreftet}
            >
                <Checkbox value={true} error={!!feilBekreftet}>
                    <LocaleTekst tekst={fellesOppsummeringTekster.bekreft.tittel} />
                </Checkbox>
            </CheckboxGroup>
        </Side>
    );
};
