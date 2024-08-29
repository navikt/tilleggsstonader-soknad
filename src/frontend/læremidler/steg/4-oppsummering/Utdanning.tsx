import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { fellesOppsummeringTekster } from '../../../tekster/oppsummering';
import { RouteTilPath } from '../../routing/routesLæremidler';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { Utdanning } from '../../typer/søknad';

const UtdanningOppsummering: React.FC<{ utdanning: Utdanning }> = ({ utdanning }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <LocaleTekst tekst={oppsummeringTekster.utdanning_tittel} />
                </FormSummary.Heading>
                <FormSummary.EditLink href={RouteTilPath.UTDANNING}>
                    <LocaleTekst tekst={fellesOppsummeringTekster.endre_knapp} />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                {utdanning.annenUtdanning !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>{utdanning.annenUtdanning.label}</FormSummary.Label>
                        <FormSummary.Value>{utdanning.annenUtdanning.svarTekst}</FormSummary.Value>
                    </FormSummary.Answer>
                )}

                {utdanning.mottarUtstyrsstipend !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {utdanning.mottarUtstyrsstipend.label}
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {utdanning.mottarUtstyrsstipend.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}

                {utdanning.harFunksjonsnedsettelse !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {utdanning.harFunksjonsnedsettelse.label}
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {utdanning.harFunksjonsnedsettelse.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default UtdanningOppsummering;
