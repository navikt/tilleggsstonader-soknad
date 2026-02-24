import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { Reisedag } from '../../types/Kjøreliste';

export const OppsummeringDag: React.FC<{ reisedag: Reisedag }> = ({ reisedag }) => {
    if (!reisedag || !reisedag.harKjørt) {
        return null;
    }
    return (
        <FormSummary.Answer>
            <FormSummary.Label>{reisedag.dato.label}</FormSummary.Label>
            {reisedag.parkeringsutgift.verdi != null ? (
                <FormSummary.Value>
                    Har reist{`, med parkeringsutgift ${reisedag.parkeringsutgift.verdi} kr.`}
                </FormSummary.Value>
            ) : (
                <FormSummary.Value>Har reist uten parkeringsutgift.</FormSummary.Value>
            )}
        </FormSummary.Answer>
    );
};
