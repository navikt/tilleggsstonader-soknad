import React, { ReactNode, useState } from 'react';

import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

import { useSpråk } from '../../context/SpråkContext';
import { fellesOppsummeringTekster } from '../../tekster/oppsummering';
import Side from '../Side';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

export const OppsummeringSide = ({ children }: { children: ReactNode }) => {
    const { locale } = useSpråk();
    const [harBekreftet, settHarBekreftet] = useState(false);
    const [feilBekreftKnapp, settFeilBekreftKnapp] = useState<string>();

    return (
        <Side
            validerSteg={() => {
                if (!harBekreftet) {
                    settFeilBekreftKnapp(fellesOppsummeringTekster.bekreft.feil[locale]);
                    return false;
                }
                settFeilBekreftKnapp('');
                return true;
            }}
        >
            {children}
            <CheckboxGroup
                value={[harBekreftet]}
                onChange={(verdier) => {
                    settHarBekreftet(verdier.includes(true));
                    settFeilBekreftKnapp('');
                }}
                legend={<LocaleTekst tekst={fellesOppsummeringTekster.bekreft.tittel} />}
                hideLegend
                error={feilBekreftKnapp}
            >
                <Checkbox value={true} error={!!feilBekreftKnapp}>
                    <LocaleTekst tekst={fellesOppsummeringTekster.bekreft.tittel} />
                </Checkbox>
            </CheckboxGroup>
        </Side>
    );
};
