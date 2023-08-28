import { Heading } from '@navikt/ds-react';

import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Stønadstype } from '../../../typer/stønadstyper';
import { personaliaTekster } from '../../tekster/personalia';

const Personalia = () => {
    return (
        <Side stegtittel={personaliaTekster.steg_tittel} stønadstype={Stønadstype.barnetilsyn}>
            <Heading size="medium">
                <LocaleTekst tekst={personaliaTekster.innhold_tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekst tekst={personaliaTekster.guide_innhold} />
            </PellePanel>
        </Side>
    );
};
export default Personalia;
