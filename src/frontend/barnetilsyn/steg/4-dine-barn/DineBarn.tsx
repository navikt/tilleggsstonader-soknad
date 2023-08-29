import Side from '../../../components/Side';
import { Stønadstype } from '../../../typer/stønadstyper';
import { dineBarnTekster } from '../../tekster/dineBarn';

const DineBarn = () => {
    return (
        <Side stegtittel={dineBarnTekster.steg_tittel} stønadstype={Stønadstype.barnetilsyn}></Side>
    );
};
export default DineBarn;
