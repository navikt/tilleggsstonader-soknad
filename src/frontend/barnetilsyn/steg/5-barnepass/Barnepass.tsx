import { useEffect, useState } from 'react';

import BarnepassSpørsmål from './BarnepassSpørsmål';
import { tilpassBarnTilSøknadContext } from './utils';
import Side from '../../../components/Side';
import { usePerson } from '../../../context/PersonContext';
import { useSøknad } from '../../../context/SøknadContext';
import { BarnMedAllInfo, BarnMedBarnepass } from '../../../typer/barn';
import { Stønadstype } from '../../../typer/stønadstyper';
import { barnepassTekster } from '../../tekster/barnepass';

const Barnepass = () => {
    const { person } = usePerson();
    const { settBarnMedBarnepass } = useSøknad();

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

    const oppdaterSøknad = () => {
        const barnTilSøknad: BarnMedBarnepass[] = [];

        barnMedPass.forEach((barn) => {
            const omgjortBarn = tilpassBarnTilSøknadContext(barn);

            if (omgjortBarn) {
                barnTilSøknad.push(omgjortBarn);
            }
        });

        settBarnMedBarnepass(barnTilSøknad);
    };

    return (
        <Side
            stegtittel={barnepassTekster.steg_tittel}
            stønadstype={Stønadstype.barnetilsyn}
            oppdaterSøknad={oppdaterSøknad}
        >
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
