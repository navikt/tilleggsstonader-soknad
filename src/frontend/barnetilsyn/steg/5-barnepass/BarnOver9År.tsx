import { Alert, Heading } from '@navikt/ds-react';

import { BarnepassIntern } from './typer';
import LocalePunktliste from '../../../components/Teksthåndtering/LocalePunktliste';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import { LocaleReadMoreMedChildren } from '../../../components/Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { UnderspørsmålContainer } from '../../../components/UnderspørsmålContainer';
import { Barn, ÅrsakBarnepass } from '../../../typer/barn';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
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
    const oppdaterStartetIFemte = (val: EnumFelt<JaNei>) => {
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
                argument0={barn.fornavn}
                value={passInfo.startetIFemte?.verdi ?? ''}
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
            {passInfo.startetIFemte?.verdi == 'JA' && (
                <UnderspørsmålContainer>
                    <LocaleRadioGroup
                        tekst={barnepassTekster.årsak_ekstra_pass_radio}
                        argument0={barn.fornavn}
                        value={passInfo.årsak?.verdi || ''}
                        onChange={(val) => oppdaterBarnMedBarnepass({ ...passInfo, årsak: val })}
                        error={
                            visFeilmeldinger &&
                            passInfo.startetIFemte !== undefined &&
                            passInfo.årsak === undefined &&
                            'Du må velge et alternativ'
                        }
                    />
                    {passInfo.årsak?.verdi === ÅrsakBarnepass.TRENGER_MER_PASS_ENN_JEVNALDRENDE && (
                        <Alert variant="info">
                            <Heading size="small">
                                <LocaleTekst tekst={barnepassTekster.mer_pleie_alert.tittel} />
                            </Heading>
                            <LocaleTekst tekst={barnepassTekster.mer_pleie_alert.innhold} />
                        </Alert>
                    )}
                    {passInfo.årsak?.verdi ===
                        ÅrsakBarnepass.MYE_BORTE_ELLER_UVANLIG_ARBEIDSTID && (
                        <Alert variant="info">
                            <LocaleTekst tekst={barnepassTekster.uvanlig_arbeidstid_alert} />
                        </Alert>
                    )}
                    {passInfo.årsak?.verdi === ÅrsakBarnepass.INGEN_AV_DISSE && (
                        <Alert variant="info">
                            <LocaleTekst tekst={barnepassTekster.ingen_av_disse_alert} />
                        </Alert>
                    )}
                </UnderspørsmålContainer>
            )}
        </>
    );
};
export default BarnOver9År;
