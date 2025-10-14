import React from 'react';

import { FileCheckmarkIcon } from '@navikt/aksel-icons';
import { FormSummary, List } from '@navikt/ds-react';

import { useKjøreliste } from '../../KjørelisteContext';
import { KjørelisteRoutes } from '../../kjørelisteRoutes';
import { finnVedleggMedParkeringsutgifter } from '../Vedleggside/VedleggUtils';

export function VedleggOppsummering() {
    const { kjøreliste } = useKjøreliste();

    if (finnVedleggMedParkeringsutgifter(kjøreliste).length === 0) {
        return null;
    }

    const VedleggListe = () => (
        <List>
            {finnVedleggMedParkeringsutgifter(kjøreliste).map((vedlegg) => (
                <List.Item key={vedlegg.id} icon={<FileCheckmarkIcon />}>
                    {vedlegg.navn}
                </List.Item>
            ))}
        </List>
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
                <FormSummary.EditLink href={KjørelisteRoutes.VEDLEGG} />
            </FormSummary.Footer>
        </FormSummary>
    );
}
