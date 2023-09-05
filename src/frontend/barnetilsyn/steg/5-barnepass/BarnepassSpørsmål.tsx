import { Alert, Heading } from '@navikt/ds-react';

import BarnOver9År from './BarnOver9År';
import { BarnepassIntern } from './typer';
import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { Barn, PassType } from '../../../typer/barn';
import { hentFornavn } from '../../../utils/formatering';
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
    return (
        <>
            <Heading size="medium">{barn.navn}</Heading>
            <LocaleRadioGroup
                tekst={barnepassTekster.hvem_passer_radio}
                argument0={hentFornavn(barn.navn)}
                value={barnepass.passType || ''}
                onChange={(passType) =>
                    oppdaterBarnMedBarnepass({ ...barnepass, passType: passType })
                }
                error={
                    visFeilmelding && barnepass.passType === undefined && 'Du må velge et alernativ'
                }
            />
            {barnepass.passType === PassType.ANDRE && (
                <Alert variant="info">
                    <LocaleInlineLenke tekst={barnepassTekster.hvem_passer_andre_alert} />
                </Alert>
            )}
            {barn.alder >= 9 && (
                <BarnOver9År
                    barn={barn}
                    passInfo={barnepass}
                    oppdaterBarnMedBarnepass={oppdaterBarnMedBarnepass}
                    visFeilmeldinger={visFeilmelding}
                />
            )}
        </>
    );
};
export default BarnepassSpørsmål;
