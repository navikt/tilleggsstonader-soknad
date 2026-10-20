import React from 'react';

import { HStack } from '@navikt/ds-react';

import { errorKeyUtgifterFom, errorKeyUtgifterTom } from './passBarnVedleggUtils';
import { BarnepassIntern } from './typer';
import { DateInput } from '../../../components/DateInput';
import { Barn } from '../../../typer/barn';
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
export const UtgifterDato: React.FC<Props> = ({
    barn,
    barnepass,
    oppdaterBarnMedBarnepass,
    valideringsfeil,
    nullstillValideringsfeil,
    locale,
}) => {
    return (
        <>
            <HStack gap="space-16">
                <DateInput
                    id={valideringsfeil[errorKeyUtgifterFom(barn)]?.id}
                    label={barnepassTekster.utgifter_dato.fom[locale]}
                    value={barnepass.utgifter?.fom?.verdi}
                    error={valideringsfeil[errorKeyUtgifterFom(barn)]?.melding}
                    onChange={(date) => {
                        const verdi = date
                            ? { label: barnepassTekster.utgifter_dato.fom[locale], verdi: date }
                            : undefined;
                        oppdaterBarnMedBarnepass({
                            ...barnepass,
                            utgifter: {
                                ...barnepass.utgifter,
                                fom: verdi,
                            },
                        });
                        nullstillValideringsfeil(errorKeyUtgifterFom(barn));
                    }}
                />
                <DateInput
                    id={valideringsfeil[errorKeyUtgifterTom(barn)]?.id}
                    label={barnepassTekster.utgifter_dato.tom[locale]}
                    value={barnepass.utgifter?.tom?.verdi}
                    error={valideringsfeil[errorKeyUtgifterTom(barn)]?.melding}
                    onChange={(date) => {
                        const verdi = date
                            ? { label: barnepassTekster.utgifter_dato.tom[locale], verdi: date }
                            : undefined;
                        oppdaterBarnMedBarnepass({
                            ...barnepass,
                            utgifter: {
                                ...barnepass.utgifter,
                                tom: verdi,
                            },
                        });
                        nullstillValideringsfeil(errorKeyUtgifterTom(barn));
                    }}
                />
            </HStack>
        </>
    );
};
