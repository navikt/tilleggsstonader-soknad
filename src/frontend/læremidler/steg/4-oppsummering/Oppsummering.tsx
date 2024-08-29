import React from 'react';

import { Heading } from '@navikt/ds-react';

import OmDeg from '../../../components/Oppsummering/OmDeg';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Stønadstype } from '../../../typer/stønadstyper';
import { oppsummeringTekster } from '../../tekster/oppsummering';

const Oppsummering = () => {
    return (
        <Side stønadstype={Stønadstype.LÆREMIDLER}>
            {' '}
            <Heading size="medium">
                <LocaleTekst tekst={oppsummeringTekster.tittel} />´{' '}
            </Heading>
            <OmDeg />
        </Side>
    );
};

export default Oppsummering;
