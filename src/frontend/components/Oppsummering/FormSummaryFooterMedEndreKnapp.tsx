import React from 'react';

import { useNavigate } from 'react-router';

import { FormSummary } from '@navikt/ds-react';

import { fellesOppsummeringTekster } from '../../tekster/oppsummering';
import appConfig from '../../utils/appConfig';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

export function FormSummaryFooterMedEndreKnapp({ lenke }: { lenke: string }) {
    const navigate = useNavigate();
    const baseUrl = appConfig.publicUrl;

    function onNavigate(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        navigate(lenke);
    }

    return (
        <FormSummary.Footer>
            <FormSummary.EditLink onClick={onNavigate} href={baseUrl + lenke}>
                <LocaleTekst tekst={fellesOppsummeringTekster.endre_knapp} />
            </FormSummary.EditLink>
        </FormSummary.Footer>
    );
}
