import { useState } from 'react';

import { VStack } from '@navikt/ds-react';

import { oppdaterDokumentasjonFeltForBarnMedPass } from './barnepassDokumentUtil';
import BarnepassSpørsmål from './BarnepassSpørsmål';
import { BarnepassIntern } from './typer';
import { finnBarn, validerBarnepass } from './utils';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useSøknad } from '../../../context/SøknadContext';
import { Barnepass } from '../../../typer/barn';
import { Stønadstype } from '../../../typer/stønadstyper';
import { valuerOrThrow } from '../../../utils/typer';
import { barnepassTekster } from '../../tekster/barnepass';

const Barnepass = () => {
    const { person } = usePerson();
    const { locale } = useSpråk();
    const { barnMedBarnepass, settBarnMedBarnepass, settDokumentasjon } = useSøknad();

    const [barnMedPass, settBarnMedPass] = useState<BarnepassIntern[]>(
        person.barn
            .filter((barn) => barn.skalHaBarnepass)
            .map(
                (barn) =>
                    barnMedBarnepass.find((barnepass) => barnepass.ident == barn.ident) || {
                        ident: barn.ident,
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
        const validerteBarn = barnMedPass.filter((barn) =>
            validerBarnepass(barn, finnBarn(person.barn, barn.ident))
        );

        if (validerteBarn.length !== barnMedPass.length) {
            settVisFeilmelding(true);
            return false;
        }
        return true;
    };

    const oppdaterSøknad = () => {
        const barnepasses = barnMedPass.filter((barn) =>
            validerBarnepass(barn, finnBarn(person.barn, barn.ident))
        ) as Barnepass[];
        settBarnMedBarnepass(barnepasses);
        settDokumentasjon((prevState) =>
            oppdaterDokumentasjonFeltForBarnMedPass(barnepasses, person.barn, prevState, locale)
        );
    };

    return (
        <Side
            stønadstype={Stønadstype.BARNETILSYN}
            tittel={barnepassTekster.tittel}
            pellePanel={<LocaleTekst tekst={barnepassTekster.guide_innhold} />}
            oppdaterSøknad={oppdaterSøknad}
            validerSteg={kanGåVidere}
        >
            <VStack gap={'10'}>
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
            </VStack>
        </Side>
    );
};
export default Barnepass;
