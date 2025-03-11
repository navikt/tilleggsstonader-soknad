import React from 'react';

import { DatePicker, HStack, useDatepicker } from '@navikt/ds-react';

import { errorKeyUtgifterFom, errorKeyUtgifterTom } from './passBarnVedleggUtils';
import { BarnepassIntern } from './typer';
import { Barn } from '../../../typer/barn';
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
const UtgifterDato: React.FC<Props> = ({
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
        <>
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
    );
};
export default UtgifterDato;
