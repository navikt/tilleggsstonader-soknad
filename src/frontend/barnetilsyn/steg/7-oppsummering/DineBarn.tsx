import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { OppsummeringPanelHeader } from '../../../components/Oppsummering/OppsummeringPanelHeader';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Person } from '../../../typer/person';
import { formaterIsoDato } from '../../../utils/formatering';
import { RouteTilPath } from '../../routing/routesBarnetilsyn';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const DineBarn: React.FC<{ person: Person; valgteBarnIdenter: string[] }> = ({
    person,
    valgteBarnIdenter,
}) => (
    <OppsummeringPanelHeader
        tittel={oppsummeringTekster.dine_barn.tittel}
        lenke={RouteTilPath.DINE_BARN}
    >
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
    </OppsummeringPanelHeader>
);
