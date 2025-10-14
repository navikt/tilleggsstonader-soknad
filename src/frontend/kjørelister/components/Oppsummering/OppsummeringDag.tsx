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
            <FormSummary.Value>
                Har reist
                {reisedag.parkeringsutgift.verdi !== 0
                    ? `, med parkeringsutgift ${reisedag.parkeringsutgift.verdi}kr.`
                    : '.'}
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};
