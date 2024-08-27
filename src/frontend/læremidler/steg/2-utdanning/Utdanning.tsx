import React from 'react';

import { Heading } from '@navikt/ds-react';

import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { Stønadstype } from '../../../typer/stønadstyper';
import { utdanningTekster } from '../../tekster/utdanning';

const Utdanning = () => {
    const validerSteg = (): boolean => {
        return false;
    };

    const oppdaterSøknad = () => {};

    return (
        <Side
            stønadstype={Stønadstype.LÆREMIDLER}
            validerSteg={validerSteg}
            oppdaterSøknad={oppdaterSøknad}
        >
            <Heading size={'medium'}>
                <LocaleTekst tekst={utdanningTekster.tittel} />
            </Heading>
            <PellePanel poster>
                <LocaleTekstAvsnitt tekst={utdanningTekster.guide_innhold} />
            </PellePanel>
        </Side>
    );
};
export default Utdanning;
