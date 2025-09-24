import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { usePerson } from '../../context/PersonContext';
import { fellesOppsummeringTekster } from '../../tekster/oppsummering';
import { LocaleReadMoreMedLenke } from '../Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

export const OmDegOppsummering = () => {
    const { person } = usePerson();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={fellesOppsummeringTekster.om_deg_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <LocaleTekst tekst={fellesOppsummeringTekster.om_deg_label_navn} />
                    </FormSummary.Label>
                    <FormSummary.Value>{person.visningsnavn}</FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <LocaleTekst tekst={fellesOppsummeringTekster.om_deg_label_adresse} />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {person.adresse}
                        <LocaleReadMoreMedLenke tekst={fellesOppsummeringTekster.om_deg_lesmer} />
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};
