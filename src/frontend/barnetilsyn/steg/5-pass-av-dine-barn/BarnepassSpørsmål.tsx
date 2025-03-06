import React from 'react';

import { Alert, DatePicker, Heading, HStack, Label, useDatepicker, VStack } from '@navikt/ds-react';

import BarnOver9År from './BarnOver9År';
import {
    er9ellerEldre,
    errorKeyHarUtgifter,
    errorKeyHvemPasser,
    errorKeyUtgifterFom,
    errorKeyUtgifterTom,
} from './passBarnVedleggUtils';
import { BarnepassIntern } from './typer';
import LocaleRadioGroup from '../../../components/Teksthåndtering/LocaleRadioGroup';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Barn, PassType } from '../../../typer/barn';
import { EnumFelt } from '../../../typer/skjema';
import { JaNei } from '../../../typer/søknad';
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
    const defaultHarUtgifterTilPass: EnumFelt<JaNei> = {
        verdi: 'NEI',
        label: 'Har utgifter til pass',
        svarTekst: 'Nei',
        alternativer: ['JA', 'NEI'],
    };
    const { datepickerProps: datepickerPropsFom, inputProps: inputPropsFom } = useDatepicker({
        defaultSelected: nullableTilDato(barnepass.utgifter?.fom?.verdi),
        onDateChange: (val) => {
            const verdi = val ? { label: 'Fra', verdi: tilLocaleDateString(val) } : undefined;
            oppdaterBarnMedBarnepass({
                ...barnepass,
                utgifter: {
                    harUtgifterTilPass:
                        barnepass.utgifter?.harUtgifterTilPass ?? defaultHarUtgifterTilPass,
                    fom: verdi,
                    tom: barnepass.utgifter?.tom,
                },
            });
            nullstillValideringsfeil(errorKeyUtgifterFom(barn));
        },
    });
    const { datepickerProps: datepickerPropsTom, inputProps: inputPropsTom } = useDatepicker({
        defaultSelected: nullableTilDato(barnepass.utgifter?.tom?.verdi),
        onDateChange: (val) => {
            const verdi = val ? { label: 'Til', verdi: tilLocaleDateString(val) } : undefined;
            oppdaterBarnMedBarnepass({
                ...barnepass,
                utgifter: {
                    harUtgifterTilPass:
                        barnepass.utgifter?.harUtgifterTilPass ?? defaultHarUtgifterTilPass,
                    fom: barnepass.utgifter?.fom,
                    tom: verdi,
                },
            });
            nullstillValideringsfeil(errorKeyUtgifterTom(barn));
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

            <LocaleRadioGroup
                id={valideringsfeil[errorKeyHarUtgifter(barn)]?.id}
                tekst={barnepassTekster.har_utgifter_til_pass_radio}
                argument0={barn.fornavn}
                value={barnepass.utgifter?.harUtgifterTilPass?.verdi || []}
                onChange={(harUtgifterTilPass) => {
                    oppdaterBarnMedBarnepass({
                        ...barnepass,
                        utgifter: {
                            ...barnepass.utgifter,
                            harUtgifterTilPass: harUtgifterTilPass,
                        },
                    });
                    if (harUtgifterTilPass.verdi === 'JA') {
                        nullstillValideringsfeil(errorKeyUtgifterFom(barn));
                        nullstillValideringsfeil(errorKeyUtgifterTom(barn));
                    }
                    nullstillValideringsfeil(errorKeyHarUtgifter(barn));
                }}
                error={valideringsfeil[errorKeyHarUtgifter(barn)]?.melding}
            />
            {barnepass.utgifter?.harUtgifterTilPass?.verdi === 'NEI' && (
                <>
                    <Label>{barnepassTekster.utgifter_dato.label[locale]}</Label>
                    <HStack gap={'4'}>
                        <DatePicker {...datepickerPropsFom}>
                            <DatePicker.Input
                                id={valideringsfeil[errorKeyUtgifterFom(barn)]?.id}
                                label={barnepassTekster.utgifter_dato.fom[locale]}
                                error={valideringsfeil[errorKeyUtgifterFom(barn)]?.melding}
                                {...inputPropsFom}
                            />
                        </DatePicker>
                        <DatePicker {...datepickerPropsTom}>
                            <DatePicker.Input
                                id={valideringsfeil[errorKeyUtgifterTom(barn)]?.id}
                                label={barnepassTekster.utgifter_dato.tom[locale]}
                                error={valideringsfeil[errorKeyUtgifterTom(barn)]?.melding}
                                {...inputPropsTom}
                            />
                        </DatePicker>
                    </HStack>
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
