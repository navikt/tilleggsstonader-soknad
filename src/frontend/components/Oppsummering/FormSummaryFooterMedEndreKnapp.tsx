import React from 'react';

import { useNavigate } from 'react-router';

import { FormSummary } from '@navikt/ds-react';

import { fellesOppsummeringTekster } from '../../tekster/oppsummering';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

export function FormSummaryFooterMedEndreKnapp({ lenke }: { lenke: string }) {
    const navigate = useNavigate();

    return (
        <FormSummary.Footer>
            <FormSummary.EditLink onClick={() => navigate(lenke)}>
                <LocaleTekst tekst={fellesOppsummeringTekster.endre_knapp} />
            </FormSummary.EditLink>
        </FormSummary.Footer>
    );
}
