import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { tilTekstligDato, tilUkedag } from '../../../utils/datoUtils';
import { useKjøreliste } from '../../KjørelisteContext';
import { finnReisedag } from '../../kjørelisteUtils';

export const OppsummeringDag: React.FC<{ dag: Date }> = ({ dag }) => {
    const { kjøreliste } = useKjøreliste();

    const reisedag = finnReisedag(kjøreliste, dag);

    if (!reisedag || !reisedag.harKjørt) {
        return null;
    }

    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                {tilUkedag(dag)} {tilTekstligDato(dag.toISOString())}
            </FormSummary.Label>
            <FormSummary.Value>
                Har reist
                {reisedag.parkeringsutgift
                    ? `, med parkeringsutgift ${reisedag.parkeringsutgift}kr.`
                    : '.'}
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};
