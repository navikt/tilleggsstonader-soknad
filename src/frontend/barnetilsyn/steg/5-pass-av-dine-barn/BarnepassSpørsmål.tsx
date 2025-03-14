import React from 'react';

import { Alert, Heading, Label, VStack } from '@navikt/ds-react';

import BarnOver9År from './BarnOver9År';
import {
    er9ellerEldre,
    errorKeyHarUtgifter,
    errorKeyHvemPasser,
    errorKeyUtgifterFom,
    errorKeyUtgifterTom,
} from './passBarnVedleggUtils';
import { BarnepassIntern } from './typer';
import UtgifterDato from './UtgifterDato';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Barn, PassType } from '../../../typer/barn';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { barnepassTekster } from '../../tekster/barnepass';

interface Props {
    barn: Barn;
    barnepass: BarnepassIntern;
    oppdaterBarnMedBarnepass: (oppdatertBarn: BarnepassIntern) => void;
    valideringsfeil: Valideringsfeil;
    nullstillValideringsfeil: (key: string) => void;
    locale: Locale;
}

const BarnepassSpørsmål: React.FC<Props> = ({
    barn,
    barnepass,
    oppdaterBarnMedBarnepass,
    valideringsfeil,
    nullstillValideringsfeil,
    locale,
}) => {
    const oppdaterUtgifter = (harUtgifterTilPass: EnumFelt<JaNei>) => {
        const skalNullstilleDato = harUtgifterTilPass.verdi === 'JA';

        if (skalNullstilleDato) {
            nullstillValideringsfeil(errorKeyUtgifterFom(barn));
            nullstillValideringsfeil(errorKeyUtgifterTom(barn));
        }

        oppdaterBarnMedBarnepass({
            ...barnepass,
            utgifter: {
                ...barnepass.utgifter,
                harUtgifterTilPass,
                fom: skalNullstilleDato ? undefined : barnepass.utgifter?.fom,
                tom: skalNullstilleDato ? undefined : barnepass.utgifter?.tom,
            },
        });

        nullstillValideringsfeil(errorKeyHarUtgifter(barn));
    };
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
                id={valideringsfeil[errorKeyHarUtgifter(barn)]?.id}
                tekst={barnepassTekster.har_utgifter_til_pass_radio}
                argument0={barn.fornavn}
                value={barnepass.utgifter?.harUtgifterTilPass?.verdi || []}
                onChange={oppdaterUtgifter}
                error={valideringsfeil[errorKeyHarUtgifter(barn)]?.melding}
            />
            {barnepass.utgifter?.harUtgifterTilPass?.verdi === 'NEI' && (
                <>
                    <Label>{barnepassTekster.utgifter_dato.label[locale]}</Label>
                    <UtgifterDato
                        barn={barn}
                        barnepass={barnepass}
                        oppdaterBarnMedBarnepass={oppdaterBarnMedBarnepass}
                        valideringsfeil={valideringsfeil}
                        nullstillValideringsfeil={nullstillValideringsfeil}
                        locale={locale}
                    />
                </>
            )}

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
