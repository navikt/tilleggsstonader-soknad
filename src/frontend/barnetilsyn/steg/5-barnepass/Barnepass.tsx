import { useEffect, useState } from 'react';

import BarnepassSpørsmål from './BarnepassSpørsmål';
import Side from '../../../components/Side';
import { usePerson } from '../../../context/PersonContext';
import { BarnMedAllInfo } from '../../../typer/barn';
import { Stønadstype } from '../../../typer/stønadstyper';
import { barnepassTekster } from '../../tekster/barnepass';

const Barnepass = () => {
    const { person } = usePerson();

    const [barnMedPass, settBarnMedPass] = useState<BarnMedAllInfo[]>([]);

    useEffect(() => {
        const barnSomSkalHaPass = person.barn.filter((barn) => barn.skalHaBarnepass);
        settBarnMedPass(barnSomSkalHaPass);
    }, [person]);

    const oppdaterBarnMedBarnepass = (oppdatertBarn: BarnMedAllInfo) => {
        settBarnMedPass((prevBarn) =>
            prevBarn.map((barn) => (barn.id === oppdatertBarn.id ? oppdatertBarn : barn))
        );
    };

    return (
        <Side stegtittel={barnepassTekster.steg_tittel} stønadstype={Stønadstype.barnetilsyn}>
            {barnMedPass.map((barn) => (
                <BarnepassSpørsmål
                    barn={barn}
                    oppdaterBarnMedBarnepass={oppdaterBarnMedBarnepass}
                />
            ))}
        </Side>
    );
};
export default Barnepass;
