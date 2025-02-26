import { Alert, Heading, VStack } from '@navikt/ds-react';

import BarnOver9År from './BarnOver9År';
import { er9ellerEldre, errorKeyHvemPasser } from './passBarnVedleggUtils';
import { BarnepassIntern } from './typer';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Barn, PassType } from '../../../typer/barn';
import { Valideringsfeil } from '../../../typer/validering';
import { barnepassTekster } from '../../tekster/barnepass';

interface Props {
    barn: Barn;
    barnepass: BarnepassIntern;
    oppdaterBarnMedBarnepass: (oppdatertBarn: BarnepassIntern) => void;
    valideringsfeil: Valideringsfeil;
    nullstillValideringsfeil: (key: string) => void;
}

const BarnepassSpørsmål: React.FC<Props> = ({
    barn,
    barnepass,
    oppdaterBarnMedBarnepass,
    valideringsfeil,
    nullstillValideringsfeil,
}) => {
    return (
        <VStack gap={'6'}>
            <LocaleRadioGroup
                id={valideringsfeil[errorKeyHvemPasser(barn)]?.id}
                tekst={barnepassTekster.hvem_passer_radio}
                argument0={barn.fornavn}
                value={barnepass.type?.verdi || ''}
                onChange={(passType) => {
                    oppdaterBarnMedBarnepass({ ...barnepass, type: passType });
                    nullstillValideringsfeil(errorKeyHvemPasser(barn));
                }}
                error={valideringsfeil[errorKeyHvemPasser(barn)]?.melding}
            />
            <LocaleRadioGroup
                id={valideringsfeil[errorKeyHvemPasser(barn)]?.id}
                tekst={barnepassTekster.har_utgifter_til_pass_radio}
                argument0={barn.fornavn}
                value={barnepass.harUtgifterTilPass?.verdi || []}
                onChange={(harUtgifterTilPass) => {
                    oppdaterBarnMedBarnepass({
                        ...barnepass,
                        harUtgifterTilPass: harUtgifterTilPass,
                    });
                    nullstillValideringsfeil(errorKeyHvemPasser(barn));
                }}
                error={valideringsfeil[errorKeyHvemPasser(barn)]?.melding}
            />

            {barnepass.type?.verdi === PassType.PRIVAT && (
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
                    valideringsfeil={valideringsfeil}
                    nullstillValideringsfeil={nullstillValideringsfeil}
                />
            )}
        </VStack>
    );
};
export default BarnepassSpørsmål;
