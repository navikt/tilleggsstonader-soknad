import { FormSummary } from '@navikt/ds-react';
import type React from 'react';

import type { Reisedag } from '../../types/Kjøreliste';

export const OppsummeringDag: React.FC<{ reisedag: Reisedag }> = ({ reisedag }) => {
    if (!reisedag?.harKjørt) {
        return null;
    }
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                {reisedag.dato.label}
                {reisedag.erHelligdag && reisedag.helligdagnavn && <> — {reisedag.helligdagnavn}</>}
            </FormSummary.Label>
            {reisedag.parkeringsutgift.verdi != null ? (
                <FormSummary.Value>
                    Har reist
                    {`, med parkeringsutgift ${reisedag.parkeringsutgift.verdi} kr.`}
                </FormSummary.Value>
            ) : (
                <FormSummary.Value>Har reist uten parkeringsutgift.</FormSummary.Value>
            )}
        </FormSummary.Answer>
    );
};
