import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { OppsummeringEnkeltbarn } from './OppsummerEnkeltbarn';
import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Barnepass } from '../../../typer/barn';
import { Person } from '../../../typer/person';
import { RouteTilPath } from '../../routing/routesBarnetilsyn';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const PassAvBarn: React.FC<{ person: Person; barnMedBarnepass: Barnepass[] }> = ({
    person,
    barnMedBarnepass,
}) => (
    <FormSummary>
        <FormSummary.Header>
            <FormSummary.Heading level={'3'}>
                <LocaleTekst tekst={oppsummeringTekster.barnepass} />
            </FormSummary.Heading>
        </FormSummary.Header>
        <FormSummary.Answers>
            {barnMedBarnepass.map((barnepass) => {
                const barn = person.barn.find((barn) => barn.ident === barnepass.ident);
                return (
                    <OppsummeringEnkeltbarn
                        barn={barn}
                        barnepass={barnepass}
                        key={barnepass.ident}
                    />
                );
            })}
        </FormSummary.Answers>
        <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.BARNEPASS} />
    </FormSummary>
);
