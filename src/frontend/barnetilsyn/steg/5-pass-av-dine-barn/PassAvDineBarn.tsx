import { useState } from 'react';

import { Heading, VStack } from '@navikt/ds-react';

import { oppdaterDokumentasjonsbehovForBarnMedPass } from './barnepassDokumentUtil';
import BarnepassSpørsmål from './BarnepassSpørsmål';
import { valider } from './passBarnVedleggUtils';
import { BarnepassIntern } from './typer';
import { PellePanel } from '../../../components/PellePanel/PellePanel';
import Side from '../../../components/Side';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { usePassAvBarnSøknad } from '../../../context/PassAvBarnSøknadContext';
import { usePerson } from '../../../context/PersonContext';
import { useSpråk } from '../../../context/SpråkContext';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { Barnepass } from '../../../typer/barn';
import { inneholderFeil } from '../../../typer/validering';
import { valueOrThrow } from '../../../utils/typeUtils';
import { barnepassTekster } from '../../tekster/barnepass';

const PassAvDineBarn = () => {
    const { person } = usePerson();
    const { locale } = useSpråk();
    const { valideringsfeil, settValideringsfeil } = useValideringsfeil();
    const { valgteBarnIdenter, barnMedBarnepass, settBarnMedBarnepass, settDokumentasjonsbehov } =
        usePassAvBarnSøknad();

    const [barnMedPass, settBarnMedPass] = useState<BarnepassIntern[]>(
        valgteBarnIdenter.map(
            (ident) =>
                barnMedBarnepass.find((barnepass) => barnepass.ident == ident) || {
                    ident: ident,
                }
        )
    );

    const nullstillValideringsfeil = (key: string) => {
        settValideringsfeil((prevState) => ({
            ...prevState,
            [key]: undefined,
        }));
    };

    const oppdaterBarnMedBarnepass = (oppdatertBarn: BarnepassIntern) => {
        settBarnMedPass((prevBarn) =>
            prevBarn.map((barn) => (barn.ident === oppdatertBarn.ident ? oppdatertBarn : barn))
        );
    };

    const kanGåVidere = (): boolean => {
        const validerteBarn = valider(barnMedPass, person.barn, locale);
        settValideringsfeil(validerteBarn);
        return !inneholderFeil(validerteBarn);
    };

    const oppdaterSøknad = () => {
        const barnepasses = barnMedPass as Barnepass[];
        settBarnMedBarnepass(barnepasses);

        settDokumentasjonsbehov((prevState) =>
            oppdaterDokumentasjonsbehovForBarnMedPass(barnepasses, person.barn, prevState)
        );
    };

    return (
        <Side oppdaterSøknad={oppdaterSøknad} validerSteg={kanGåVidere}>
            <Heading size="medium">
                <LocaleTekst tekst={barnepassTekster.tittel} />
            </Heading>
            <PellePanel>
                <LocaleTekst tekst={barnepassTekster.guide_innhold} />
            </PellePanel>
            <VStack gap={'10'}>
                {barnMedPass.map((barn) => (
                    <BarnepassSpørsmål
                        key={barn.ident}
                        barn={valueOrThrow(
                            person.barn.find((barneInfo) => barn.ident === barneInfo.ident)
                        )}
                        barnepass={barn}
                        oppdaterBarnMedBarnepass={oppdaterBarnMedBarnepass}
                        valideringsfeil={valideringsfeil}
                        nullstillValideringsfeil={nullstillValideringsfeil}
                    />
                ))}
            </VStack>
        </Side>
    );
};
export default PassAvDineBarn;
