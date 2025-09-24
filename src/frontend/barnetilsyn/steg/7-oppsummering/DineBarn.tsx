import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Person } from '../../../typer/person';
import { formaterIsoDato } from '../../../utils/formateringUtils';
import { RouteTilPath } from '../../routing/routesBarnetilsyn';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const DineBarn: React.FC<{ person: Person; valgteBarnIdenter: string[] }> = ({
    person,
    valgteBarnIdenter,
}) => (
    <FormSummary>
        <FormSummary.Header>
            <FormSummary.Heading level="3">
                <LocaleTekst tekst={oppsummeringTekster.dine_barn.label} />
            </FormSummary.Heading>
        </FormSummary.Header>
        <FormSummary.Answers>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <LocaleTekst tekst={oppsummeringTekster.dine_barn.label} />
                </FormSummary.Label>
                {person.barn
                    .filter((barn) => valgteBarnIdenter.some((ident) => ident === barn.ident))
                    .map((barn) => (
                        <FormSummary.Value key={barn.ident}>
                            {barn.visningsnavn}, født {formaterIsoDato(barn.fødselsdato)}
                        </FormSummary.Value>
                    ))}
            </FormSummary.Answer>
        </FormSummary.Answers>
        <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.DINE_BARN} />
    </FormSummary>
);
