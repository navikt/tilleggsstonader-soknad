import { Alert, Heading, VStack } from '@navikt/ds-react';

import BarnOver9År from './BarnOver9År';
import { BarnepassIntern } from './typer';
import { er9ellerEldre } from './utils';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { useSpråk } from '../../../context/SpråkContext';
import { Barn, PassType } from '../../../typer/barn';
import { hentBeskjedMedEttParameter } from '../../../utils/tekster';
import { barnepassTekster } from '../../tekster/barnepass';

interface Props {
    barn: Barn;
    barnepass: BarnepassIntern;
    oppdaterBarnMedBarnepass: (oppdatertBarn: BarnepassIntern) => void;
    visFeilmelding: boolean;
}

const BarnepassSpørsmål: React.FC<Props> = ({
    barn,
    barnepass,
    oppdaterBarnMedBarnepass,
    visFeilmelding,
}) => {
    const { locale } = useSpråk();
    return (
        <VStack gap={'6'}>
            <LocaleRadioGroup
                tekst={barnepassTekster.hvem_passer_radio}
                argument0={barn.fornavn}
                value={barnepass.type?.verdi || ''}
                onChange={(passType) => oppdaterBarnMedBarnepass({ ...barnepass, type: passType })}
                error={
                    visFeilmelding &&
                    barnepass.type === undefined &&
                    hentBeskjedMedEttParameter(
                        barn.fornavn,
                        barnepassTekster.hvem_passer_feilmelding[locale]
                    )
                }
            />
            {barnepass.type?.verdi === PassType.ANDRE && (
                <Alert variant="info">
                    <Heading size="small">
                        <LocaleTekst tekst={barnepassTekster.hvem_passer_andre_alert.tittel} />
                    </Heading>
                    <LocaleTekst tekst={barnepassTekster.hvem_passer_andre_alert.innhold} />
                </Alert>
            )}
            {er9ellerEldre(barn) && (
                <BarnOver9År
                    barn={barn}
                    passInfo={barnepass}
                    oppdaterBarnMedBarnepass={oppdaterBarnMedBarnepass}
                    visFeilmeldinger={visFeilmelding}
                />
            )}
        </VStack>
    );
};
export default BarnepassSpørsmål;
