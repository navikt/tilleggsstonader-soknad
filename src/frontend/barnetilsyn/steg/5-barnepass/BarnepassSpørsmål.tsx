import { Alert, Heading } from '@navikt/ds-react';

import { BarnMedAllInfo } from './Barnepass';
import LocaleInlineLenke from '../../../components/Teksthåndtering/LocaleInlineLenke';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { PassType } from '../../../typer/barn';
import { hentFornavn } from '../../../utils/formatering';
import { barnepassTekster } from '../../tekster/barnepass';

const BarnepassSpørsmål: React.FC<{
    barn: BarnMedAllInfo;
    oppdaterBarnMedBarnepass: (oppdatertBarn: BarnMedAllInfo) => void;
}> = ({ barn, oppdaterBarnMedBarnepass }) => {
    return (
        <>
            <Heading size="medium">{barn.navn}</Heading>
            <LocaleRadioGroup
                tekst={barnepassTekster.hvem_passer_radio}
                argument0={hentFornavn(barn.navn)}
                value={barn.passType}
                onChange={(passType) => oppdaterBarnMedBarnepass({ ...barn, passType: passType })}
            />
            {barn.passType === PassType.ANDRE && (
                <Alert variant="info">
                    <LocaleInlineLenke tekst={barnepassTekster.hvem_passer_andre_alert} />
                </Alert>
            )}
        </>
    );
};
export default BarnepassSpørsmål;
