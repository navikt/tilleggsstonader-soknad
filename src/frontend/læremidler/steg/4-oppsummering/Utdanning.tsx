import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FormSummary } from '@navikt/ds-react';

import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { fellesOppsummeringTekster } from '../../../tekster/oppsummering';
import { RouteTilPath } from '../../routing/routesLæremidler';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { Utdanning } from '../../typer/søknad';

const UtdanningOppsummering: React.FC<{ utdanning: Utdanning }> = ({ utdanning }) => {
    const navigate = useNavigate();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <LocaleTekst tekst={oppsummeringTekster.utdanning_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {utdanning.aktiviteter && (
                    <FormSummary.Answer>
                        <FormSummary.Label>{utdanning.aktiviteter.label}</FormSummary.Label>
                        {utdanning.aktiviteter.verdier
                            .filter((verdi) => verdi.verdi !== 'ANNET')
                            .map((verdi, index) => (
                                <FormSummary.Value key={index}>{verdi.label}</FormSummary.Value>
                            ))}
                    </FormSummary.Answer>
                )}
                {utdanning.annenUtdanning !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>{utdanning.annenUtdanning.label}</FormSummary.Label>
                        <FormSummary.Value>{utdanning.annenUtdanning.svarTekst}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {utdanning.harRettTilUtstyrsstipend?.erLærlingEllerLiknende !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {utdanning.harRettTilUtstyrsstipend.erLærlingEllerLiknende.label}
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {utdanning.harRettTilUtstyrsstipend.erLærlingEllerLiknende.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {utdanning.harRettTilUtstyrsstipend?.harTidligereFullførtVgs !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {utdanning.harRettTilUtstyrsstipend.harTidligereFullførtVgs.label}
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {utdanning.harRettTilUtstyrsstipend.harTidligereFullførtVgs.svarTekst}
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
            <FormSummary.Footer>
                <FormSummary.EditLink onClick={() => navigate(RouteTilPath.UTDANNING)}>
                    <LocaleTekst tekst={fellesOppsummeringTekster.endre_knapp} />
                </FormSummary.EditLink>
            </FormSummary.Footer>
        </FormSummary>
    );
};

export default UtdanningOppsummering;
