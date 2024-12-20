import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FormSummary } from '@navikt/ds-react';

import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { fellesOppsummeringTekster } from '../../../tekster/oppsummering';
import { Person } from '../../../typer/person';
import { formaterIsoDato } from '../../../utils/formatering';
import { RouteTilPath } from '../../routing/routesBarnetilsyn';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const DineBarn: React.FC<{ person: Person; valgteBarnIdenter: string[] }> = ({
    person,
    valgteBarnIdenter,
}) => {
    const navigate = useNavigate();
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <LocaleTekst tekst={oppsummeringTekster.dine_barn.tittel} />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={() => navigate(RouteTilPath.DINE_BARN)}>
                    <LocaleTekst tekst={fellesOppsummeringTekster.endre_knapp} />
                </FormSummary.EditLink>
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
        </FormSummary>
    );
};
