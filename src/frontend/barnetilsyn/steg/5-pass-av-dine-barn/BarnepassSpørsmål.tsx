import React from 'react';

import { Alert, DatePicker, Heading, HStack, Label, useDatepicker, VStack } from '@navikt/ds-react';

import BarnOver9År from './BarnOver9År';
import {
    er9ellerEldre,
    errorKeyHarUtgifter,
    errorKeyHvemPasser,
    errorKeyUtgifterTidFom,
    errorKeyUtgifterTidTom,
} from './passBarnVedleggUtils';
import { BarnepassIntern } from './typer';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Barn, PassType } from '../../../typer/barn';
import { Locale } from '../../../typer/tekst';
import { Valideringsfeil } from '../../../typer/validering';
import { nullableTilDato, tilLocaleDateString } from '../../../utils/formateringUtils';
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
    const { datepickerProps: datepickerPropsFom, inputProps: inputPropsFom } = useDatepicker({
        defaultSelected: nullableTilDato(barnepass.fom?.verdi),
        onDateChange: (val) => {
            const verdi = val ? { label: 'Fra', verdi: tilLocaleDateString(val) } : undefined;
            oppdaterBarnMedBarnepass({ ...barnepass, fom: verdi });
            nullstillValideringsfeil(errorKeyUtgifterTidFom(barn));
        },
    });
    const { datepickerProps: datepickerPropsTom, inputProps: inputPropsTom } = useDatepicker({
        defaultSelected: nullableTilDato(barnepass.tom?.verdi),
        onDateChange: (val) => {
            const verdi = val ? { label: 'Til', verdi: tilLocaleDateString(val) } : undefined;
            oppdaterBarnMedBarnepass({ ...barnepass, tom: verdi });
            nullstillValideringsfeil(errorKeyUtgifterTidTom(barn));
        },
    });
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
            <div>
                <LocaleRadioGroup
                    id={valideringsfeil[errorKeyHarUtgifter(barn)]?.id}
                    tekst={barnepassTekster.har_utgifter_til_pass_radio}
                    argument0={barn.fornavn}
                    value={barnepass.harUtgifterTilPass?.verdi || []}
                    onChange={(harUtgifterTilPass) => {
                        oppdaterBarnMedBarnepass({
                            ...barnepass,
                            harUtgifterTilPass: harUtgifterTilPass,
                        });
                        nullstillValideringsfeil(errorKeyHarUtgifter(barn));
                    }}
                    error={valideringsfeil[errorKeyHarUtgifter(barn)]?.melding}
                />
                {barnepass.harUtgifterTilPass?.verdi === 'NEI' && (
                    <VStack gap={'4'}>
                        <Label>{barnepassTekster.utgifter_dato.label[locale]}</Label>
                        <HStack gap={'4'}>
                            <DatePicker {...datepickerPropsFom}>
                                <DatePicker.Input
                                    id={valideringsfeil[errorKeyUtgifterTidFom(barn)]?.id}
                                    label={barnepassTekster.utgifter_dato.fom[locale]}
                                    error={valideringsfeil[errorKeyUtgifterTidFom(barn)]?.melding}
                                    {...inputPropsFom}
                                />
                            </DatePicker>{' '}
                            <DatePicker {...datepickerPropsTom}>
                                <DatePicker.Input
                                    id={valideringsfeil[errorKeyUtgifterTidTom(barn)]?.id}
                                    label={barnepassTekster.utgifter_dato.tom[locale]}
                                    error={valideringsfeil[errorKeyUtgifterTidTom(barn)]?.melding}
                                    {...inputPropsTom}
                                />
                            </DatePicker>{' '}
                        </HStack>{' '}
                    </VStack>
                )}
            </div>

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
