import { useEffect, useState } from 'react';

import BarnepassSpørsmål from './BarnepassSpørsmål';
import { harBarnMangler, tilpassBarnTilSøknadContext } from './utils';
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
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);

    useEffect(() => {
        const barnSomSkalHaPass = person.barn.filter((barn) => barn.skalHaBarnepass);
        settBarnMedPass(
            barnSomSkalHaPass.map((barn) => ({
                ...barn,
                startetIFemte: barn.alder < 9 ? false : undefined,
            }))
        );
    }, [person]);

    const oppdaterBarnMedBarnepass = (oppdatertBarn: BarnMedAllInfo) => {
        settBarnMedPass((prevBarn) =>
            prevBarn.map((barn) => (barn.id === oppdatertBarn.id ? oppdatertBarn : barn))
        );
    };

    const kanGåVidere = () => {
        const barnMedMangler = barnMedPass.filter((barn) => harBarnMangler(barn));

        if (barnMedMangler.length !== 0) {
            settVisFeilmelding(true);
            return false;
        }
        return true;
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
            validerSteg={kanGåVidere}
        >
            {barnMedPass.map((barn) => (
                <BarnepassSpørsmål
                    key={barn.id}
                    barn={barn}
                    oppdaterBarnMedBarnepass={oppdaterBarnMedBarnepass}
                    visFeilmelding={visFeilmelding}
                />
            ))}
        </Side>
    );
};
export default Barnepass;
