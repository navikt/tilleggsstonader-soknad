import Side from '../../../components/Side';
import { Stønadstype } from '../../../typer/stønadstyper';
import { aktivitetTekster } from '../../tekster/aktivitet';

const Aktivitet = () => {
    return (
        <Side
            stegtittel={aktivitetTekster.steg_tittel}
            stønadstype={Stønadstype.barnetilsyn}
        ></Side>
    );
};
export default Aktivitet;
