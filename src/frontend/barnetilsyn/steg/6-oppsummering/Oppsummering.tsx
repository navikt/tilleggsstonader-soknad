import Side from '../../../components/Side';
import { Stønadstype } from '../../../typer/stønadstyper';
import { oppsummeringTekster } from '../../tekster/oppsummering';

const Oppsummering = () => {
    return (
        <Side
            stegtittel={oppsummeringTekster.steg_tittel}
            stønadstype={Stønadstype.barnetilsyn}
        ></Side>
    );
};

export default Oppsummering;
