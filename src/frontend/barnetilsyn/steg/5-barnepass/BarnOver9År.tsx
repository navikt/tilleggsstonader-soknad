import { Alert } from '@navikt/ds-react';

import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleReadMore from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { BarnMedAllInfo, ÅrsakBarnepass } from '../../../typer/barn';
import { hentFornavn } from '../../../utils/formatering';
import { barnepassTekster } from '../../tekster/barnepass';

interface Props {
    barn: BarnMedAllInfo;
    oppdaterBarnMedBarnepass: (oppdatertBarn: BarnMedAllInfo) => void;
    visFeilmeldinger: boolean;
}
const BarnOver9År: React.FC<Props> = ({ barn, oppdaterBarnMedBarnepass, visFeilmeldinger }) => {
    const oppdaterStartetIFemte = (val: boolean) => {
        oppdaterBarnMedBarnepass({
            ...barn,
            startetIFemte: val,
            årsakBarnepass: undefined,
        });
    };

    return (
        <>
            <LocaleRadioGroup
                tekst={barnepassTekster.startet_femte_radio}
                argument0={hentFornavn(barn.navn)}
                value={barn.startetIFemte ?? ''}
                onChange={(val) => oppdaterStartetIFemte(val)}
                error={
                    visFeilmeldinger &&
                    barn.startetIFemte === undefined &&
                    'Du må velge et alternativ'
                }
            >
                <LocaleReadMore tekst={barnepassTekster.startet_femte_readmore} />
            </LocaleRadioGroup>
            {barn.startetIFemte && (
                <>
                    <LocaleRadioGroup
                        tekst={barnepassTekster.årsak_ekstra_pass_radio}
                        argument0={hentFornavn(barn.navn)}
                        value={barn.årsakBarnepass || ''}
                        onChange={(val) =>
                            oppdaterBarnMedBarnepass({ ...barn, årsakBarnepass: val })
                        }
                        error={
                            visFeilmeldinger &&
                            barn.startetIFemte !== undefined &&
                            barn.årsakBarnepass === undefined &&
                            'Du må velge et alternativ'
                        }
                    />
                    {barn.årsakBarnepass === ÅrsakBarnepass.TRENGER_MER_PASS_ENN_JEVNALDRENDE && (
                        <Alert variant="info">
                            <LocaleTekst tekst={barnepassTekster.mer_pleie_alert} />
                        </Alert>
                    )}
                    {barn.årsakBarnepass === ÅrsakBarnepass.MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID && (
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
