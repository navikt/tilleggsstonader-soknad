import { Alert, Heading } from '@navikt/ds-react';

import BarnOver9År from './BarnOver9År';
import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { BarnMedAllInfo, PassType } from '../../../typer/barn';
import { hentFornavn } from '../../../utils/formatering';
import { barnepassTekster } from '../../tekster/barnepass';

interface Props {
    barn: BarnMedAllInfo;
    oppdaterBarnMedBarnepass: (oppdatertBarn: BarnMedAllInfo) => void;
    visFeilmelding: boolean;
}

const BarnepassSpørsmål: React.FC<Props> = ({ barn, oppdaterBarnMedBarnepass, visFeilmelding }) => {
    return (
        <>
            <Heading size="medium">{barn.navn}</Heading>
            <LocaleRadioGroup
                tekst={barnepassTekster.hvem_passer_radio}
                argument0={hentFornavn(barn.navn)}
                value={barn.passType || ''}
                onChange={(passType) => oppdaterBarnMedBarnepass({ ...barn, passType: passType })}
                error={visFeilmelding && barn.passType === undefined && 'Du må velge et alernativ'}
            />
            {barn.passType === PassType.ANDRE && (
                <Alert variant="info">
                    <LocaleInlineLenke tekst={barnepassTekster.hvem_passer_andre_alert} />
                </Alert>
            )}
            {barn.alder >= 9 && (
                <BarnOver9År
                    barn={barn}
                    oppdaterBarnMedBarnepass={oppdaterBarnMedBarnepass}
                    visFeilmeldinger={visFeilmelding}
                />
            )}
        </>
    );
};
export default BarnepassSpørsmål;
