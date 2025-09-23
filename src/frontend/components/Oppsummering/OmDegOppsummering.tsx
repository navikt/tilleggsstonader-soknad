import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { OppsummeringPanelHeader } from './OppsummeringPanelHeader';
import { usePerson } from '../../context/PersonContext';
import { fellesOppsummeringTekster } from '../../tekster/oppsummering';
import { LocaleReadMoreMedLenke } from '../Teksthåndtering/LocaleReadMore';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

export const OmDegOppsummering = () => {
    const { person } = usePerson();

    return (
        <OppsummeringPanelHeader tittel={fellesOppsummeringTekster.om_deg_tittel}>
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
        </OppsummeringPanelHeader>
    );
};
