import React from 'react';

import { Heading } from '@navikt/ds-react';

import UtdanningOppsummering from './Utdanning';
import OmDeg from '../../../components/Oppsummering/OmDeg';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useLæremidlerSøknad } from '../../../context/LæremiddelSøknadContext';
import { Stønadstype } from '../../../typer/stønadstyper';
import { oppsummeringTekster } from '../../tekster/oppsummering';

const Oppsummering = () => {
    const { utdanning } = useLæremidlerSøknad();
    return (
        <Side stønadstype={Stønadstype.LÆREMIDLER}>
            {' '}
            <Heading size="medium">
                <LocaleTekst tekst={oppsummeringTekster.tittel} />
            </Heading>
            <OmDeg />
            {utdanning && <UtdanningOppsummering utdanning={utdanning} />}
        </Side>
    );
};

export default Oppsummering;
