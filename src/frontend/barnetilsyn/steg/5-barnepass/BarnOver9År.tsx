import { Alert } from '@navikt/ds-react';

import { BarnepassIntern } from './typer';
import LocalePunktliste from '../../../components/Teksthåndtering/LocalePunktliste';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Barn, ÅrsakBarnepass } from '../../../typer/barn';
import { JaNei } from '../../../typer/søknad';
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
    const oppdaterStartetIFemte = (val: JaNei) => {
        oppdaterBarnMedBarnepass({
            ...passInfo,
            startetIFemte: val,
            årsak: undefined,
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
                <LocaleReadMoreMedChildren header={barnepassTekster.startet_femte_readmore_header}>
                    <LocaleTekst tekst={barnepassTekster.startet_femte_readmore_innhold} />
                    <LocalePunktliste
                        innhold={barnepassTekster.startet_femte_readmore_punktliste}
                    />
                </LocaleReadMoreMedChildren>
            </LocaleRadioGroup>
            {passInfo.startetIFemte == 'JA' && (
                <>
                    <LocaleRadioGroup
                        tekst={barnepassTekster.årsak_ekstra_pass_radio}
                        argument0={hentFornavn(barn.navn)}
                        value={passInfo.årsak || ''}
                        onChange={(val) => oppdaterBarnMedBarnepass({ ...passInfo, årsak: val })}
                        error={
                            visFeilmeldinger &&
                            passInfo.startetIFemte !== undefined &&
                            passInfo.årsak === undefined &&
                            'Du må velge et alternativ'
                        }
                    />
                    {passInfo.årsak === ÅrsakBarnepass.TRENGER_MER_PASS_ENN_JEVNALDRENDE && (
                        <Alert variant="info">
                            <LocaleTekst tekst={barnepassTekster.mer_pleie_alert} />
                        </Alert>
                    )}
                    {passInfo.årsak === ÅrsakBarnepass.MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID && (
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
