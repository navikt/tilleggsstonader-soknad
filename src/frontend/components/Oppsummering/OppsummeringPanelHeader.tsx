import React, { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { FormSummary } from '@navikt/ds-react';

import { fellesOppsummeringTekster } from '../../tekster/oppsummering';
import { TekstElement } from '../../typer/tekst';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

export const OppsummeringPanelHeader: React.FC<{
    tittel: TekstElement<string>;
    lenke?: string;
    children: ReactNode;
}> = ({ tittel, lenke, children }) => {
    const navigate = useNavigate();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <LocaleTekst tekst={tittel} />
                </FormSummary.Heading>
                {lenke && (
                    <FormSummary.EditLink onClick={() => navigate(lenke)}>
                        <LocaleTekst tekst={fellesOppsummeringTekster.endre_knapp} />
                    </FormSummary.EditLink>
                )}
            </FormSummary.Header>
            <FormSummary.Answers>{children}</FormSummary.Answers>
        </FormSummary>
    );
};
