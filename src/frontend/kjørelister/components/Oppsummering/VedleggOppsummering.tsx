import React from 'react';

import { useNavigate } from 'react-router';

import { FileCheckmarkIcon } from '@navikt/aksel-icons';
import { Box, FormSummary, List } from '@navikt/ds-react';

import { useKjøreliste } from '../../KjørelisteContext';
import { finnPath, KjørelisteRoutes } from '../../kjørelisteRoutes';
import { finnVedleggMedParkeringsutgifter } from '../Vedleggside/VedleggUtils';

export function VedleggOppsummering() {
    const { kjøreliste } = useKjøreliste();
    const navigate = useNavigate();

    if (finnVedleggMedParkeringsutgifter(kjøreliste).length === 0) {
        return null;
    }

    const VedleggListe = () => (
        <Box marginBlock="space-16" asChild>
            <List>
                {finnVedleggMedParkeringsutgifter(kjøreliste).map((vedlegg) => (
                    <List.Item key={vedlegg.id} icon={<FileCheckmarkIcon />}>
                        {vedlegg.navn}
                    </List.Item>
                ))}
            </List>
        </Box>
    );

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">Vedlegg</FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>Parkeringsutgifter</FormSummary.Label>
                    <FormSummary.Value>
                        <VedleggListe />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
            <FormSummary.Footer>
                <FormSummary.EditLink
                    onClick={() => navigate(finnPath(kjøreliste.reiseId, KjørelisteRoutes.VEDLEGG))}
                    style={{ cursor: 'pointer' }}
                />
            </FormSummary.Footer>
        </FormSummary>
    );
}
