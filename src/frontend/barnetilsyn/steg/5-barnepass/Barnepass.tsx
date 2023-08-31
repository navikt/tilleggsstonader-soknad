import Side from '../../../components/Side';
import { Stønadstype } from '../../../typer/stønadstyper';
import { barnepassTekster } from '../../tekster/barnepass';

const Barnepass = () => {
    return (
        <Side
            stegtittel={barnepassTekster.steg_tittel}
            stønadstype={Stønadstype.barnetilsyn}
        ></Side>
    );
};
export default Barnepass;
