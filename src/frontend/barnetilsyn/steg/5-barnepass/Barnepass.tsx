import { useState } from 'react';

import BarnepassSpørsmål from './BarnepassSpørsmål';
import { BarnepassIntern } from './typer';
import { validerBarnepass } from './utils';
import Side from '../../../components/Side';
import { usePerson } from '../../../context/PersonContext';
import { useSøknad } from '../../../context/SøknadContext';
import { Stønadstype } from '../../../typer/stønadstyper';
import { valuerOrThrow } from '../../../utils/typer';
import { barnepassTekster } from '../../tekster/barnepass';

const Barnepass = () => {
    const { person } = usePerson();
    const { barnMedBarnepass, settBarnMedBarnepass } = useSøknad();

    const [barnMedPass, settBarnMedPass] = useState<BarnepassIntern[]>(
        person.barn
            .filter((barn) => barn.skalHaBarnepass)
            .map(
                (barn) =>
                    barnMedBarnepass.find((barnepass) => barnepass.ident == barn.ident) || {
                        ident: barn.ident,
                        //startetIFemte: barn.alder < 9 ? 'NEI' : undefined, TODO fix annars får man ikke gå videre når man velger Ronja
                    }
            )
    );
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);

    const oppdaterBarnMedBarnepass = (oppdatertBarn: BarnepassIntern) => {
        settBarnMedPass((prevBarn) =>
            prevBarn.map((barn) => (barn.ident === oppdatertBarn.ident ? oppdatertBarn : barn))
        );
    };

    const kanGåVidere = () => {
        const validerteBarn = barnMedPass.filter(validerBarnepass);

        if (validerteBarn.length !== barnMedPass.length) {
            settVisFeilmelding(true);
            return false;
        }
        return true;
    };
    const oppdaterSøknad = () => {
        settBarnMedBarnepass(barnMedPass.filter(validerBarnepass));
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
                    key={barn.ident}
                    barn={valuerOrThrow(
                        person.barn.find((barneInfo) => barn.ident === barneInfo.ident)
                    )}
                    barnepass={barn}
                    oppdaterBarnMedBarnepass={oppdaterBarnMedBarnepass}
                    visFeilmelding={visFeilmelding}
                />
            ))}
        </Side>
    );
};
export default Barnepass;
