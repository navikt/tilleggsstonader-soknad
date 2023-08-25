import { GuidePanel, Heading } from '@navikt/ds-react';

import { LocaleTekst } from '../../../components/LocaleTekst';
import Side from '../../../components/Side';
import { Stønadstype } from '../../../typer/stønadstyper';
import { personaliaTekster } from '../../tekster/personalia';

const Personalia = () => {
    return (
        <Side stegtittel={personaliaTekster.steg_tittel} stønadstype={Stønadstype.barnetilsyn}>
            <Heading size="medium">
                <LocaleTekst tekst={personaliaTekster.innhold_tittel} />
            </Heading>
            <GuidePanel>
                <LocaleTekst tekst={personaliaTekster.guide_innhold} />
            </GuidePanel>
        </Side>
    );
};
export default Personalia;
