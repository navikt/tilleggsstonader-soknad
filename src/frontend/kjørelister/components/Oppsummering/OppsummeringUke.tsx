import { FormSummary } from '@navikt/ds-react';
import type React from 'react';
import { useNavigate } from 'react-router';
import { KjørelisteRoutes } from '../../kjørelisteRoutes';
import { harReist } from '../../kjørelisteUtils';
import type { UkeMedReisedager } from '../../types/Kjøreliste';
import { OppsummeringDag } from './OppsummeringDag';

export const OppsummeringUke: React.FC<{ ukeMedReisedager: UkeMedReisedager }> = ({
    ukeMedReisedager
}) => {
    const navigate = useNavigate();

    if (!harReist(ukeMedReisedager.reisedager)) {
        return null;
    }

    const handleNavigate = () => {
        navigate(KjørelisteRoutes.SKJEMA);
    };

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
                <FormSummary.EditLink onClick={handleNavigate} style={{ cursor: 'pointer' }} />
            </FormSummary.Footer>
        </FormSummary>
    );
};
