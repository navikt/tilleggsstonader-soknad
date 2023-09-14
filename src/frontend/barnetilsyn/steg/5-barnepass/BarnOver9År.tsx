import { Alert } from '@navikt/ds-react';

import { BarnepassIntern } from './typer';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMore } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Barn, ÅrsakBarnepass } from '../../../typer/barn';
import { hentFornavn } from '../../../utils/formatering';
import { barnepassTekster } from '../../tekster/barnepass';

interface Props {
    barn: Barn;
    passInfo: BarnepassIntern;
    oppdaterBarnMedBarnepass: (oppdatertBarn: BarnepassIntern) => void;
    visFeilmeldinger: boolean;
}
const BarnOver9År: React.FC<Props> = ({
    barn,
    passInfo,
    oppdaterBarnMedBarnepass,
    visFeilmeldinger,
}) => {
    const oppdaterStartetIFemte = (val: boolean) => {
        oppdaterBarnMedBarnepass({
            ...passInfo,
            startetIFemte: val,
            årsakBarnepass: undefined,
        });
    };

    return (
        <>
            <LocaleRadioGroup
                tekst={barnepassTekster.startet_femte_radio}
                argument0={hentFornavn(barn.navn)}
                value={passInfo.startetIFemte ?? ''}
                onChange={oppdaterStartetIFemte}
                error={
                    visFeilmeldinger &&
                    passInfo.startetIFemte === undefined &&
                    'Du må velge et alternativ'
                }
            >
                <LocaleReadMore tekst={barnepassTekster.startet_femte_readmore} />
            </LocaleRadioGroup>
            {passInfo.startetIFemte && (
                <>
                    <LocaleRadioGroup
                        tekst={barnepassTekster.årsak_ekstra_pass_radio}
                        argument0={hentFornavn(barn.navn)}
                        value={passInfo.årsakBarnepass || ''}
                        onChange={(val) =>
                            oppdaterBarnMedBarnepass({ ...passInfo, årsakBarnepass: val })
                        }
                        error={
                            visFeilmeldinger &&
                            passInfo.startetIFemte !== undefined &&
                            passInfo.årsakBarnepass === undefined &&
                            'Du må velge et alternativ'
                        }
                    />
                    {passInfo.årsakBarnepass ===
                        ÅrsakBarnepass.TRENGER_MER_PASS_ENN_JEVNALDRENDE && (
                        <Alert variant="info">
                            <LocaleTekst tekst={barnepassTekster.mer_pleie_alert} />
                        </Alert>
                    )}
                    {passInfo.årsakBarnepass ===
                        ÅrsakBarnepass.MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID && (
                        <Alert variant="info">
                            <LocaleTekst tekst={barnepassTekster.uvanlig_arbeidstid_alert} />
                        </Alert>
                    )}
                </>
            )}
        </>
    );
};
export default BarnOver9År;
