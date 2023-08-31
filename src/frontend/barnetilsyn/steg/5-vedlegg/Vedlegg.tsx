import React from 'react';

import { Heading } from '@navikt/ds-react';

import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../../../components/Teksthåndtering/LocaleTekstAvsnitt';
import { Stønadstype } from '../../../typer/stønadstyper';
import { vedleggTekster } from '../../tekster/vedlegg';

const Vedlegg = () => {
    return (
        <Side stønadstype={Stønadstype.barnetilsyn} stegtittel={vedleggTekster.steg_tittel}>
            <Heading size={'medium'}>
                <LocaleTekst tekst={vedleggTekster.innhold_tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekstAvsnitt tekst={vedleggTekster.guide_innhold} />
            </PellePanel>
        </Side>
    );
};

export default Vedlegg;
