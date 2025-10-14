import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { OppsummeringDag } from './OppsummeringDag';
import { KjørelisteRoutes } from '../../kjørelisteRoutes';
import { harReist } from '../../kjørelisteUtils';
import { UkeMedReisedager } from '../../types/Kjøreliste';

export const OppsummeringUke: React.FC<{ ukeMedReisedager: UkeMedReisedager }> = ({
    ukeMedReisedager,
}) => {
    if (!harReist(ukeMedReisedager.reisedager)) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level={'3'}>{ukeMedReisedager.ukeLabel}</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {ukeMedReisedager.reisedager.map((reisedag) => (
                    <OppsummeringDag key={reisedag.dato.label} reisedag={reisedag} />
                ))}
            </FormSummary.Answers>
            <FormSummary.Footer>
                <FormSummary.EditLink href={KjørelisteRoutes.SKJEMA} />
            </FormSummary.Footer>
        </FormSummary>
    );
};
