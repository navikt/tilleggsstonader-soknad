import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { usePerson } from '../../context/PersonContext';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

const OmDeg = () => {
    const { person } = usePerson();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <LocaleTekst tekst={oppsummeringTekster.om_deg_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <LocaleTekst tekst={oppsummeringTekster.om_deg_label_navn} />
                    </FormSummary.Label>
                    <FormSummary.Value>{person.visningsnavn}</FormSummary.Value>
                </FormSummary.Answer>

                <FormSummary.Answer>
                    <FormSummary.Label>
                        <LocaleTekst tekst={oppsummeringTekster.om_deg_label_adresse} />
                    </FormSummary.Label>
                    <FormSummary.Value>{person.adresse}</FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default OmDeg;
