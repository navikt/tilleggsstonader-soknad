import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FormSummary } from '@navikt/ds-react';

import ArbeidOgOppholdOppsummering from './ArbeidOgOpphold';
import { RouteTilPath } from '../../../læremidler/routing/routesLæremidler';
import { fellesOppsummeringTekster } from '../../../tekster/oppsummering';
import { Hovedytelse } from '../../../typer/søknad';
import LocaleTekst from '../../Teksthåndtering/LocaleTekst';

const HovedytelseOppsummering: React.FC<{ hovedytelse: Hovedytelse }> = ({ hovedytelse }) => {
    const navigate = useNavigate();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <LocaleTekst tekst={fellesOppsummeringTekster.hovedytelse_tittel} />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={() => navigate(RouteTilPath.HOVEDYTELSE)}>
                    <LocaleTekst tekst={fellesOppsummeringTekster.endre_knapp} />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                {hovedytelse.ytelse && (
                    <FormSummary.Answer>
                        <FormSummary.Label>{hovedytelse.ytelse.label}</FormSummary.Label>
                        {hovedytelse.ytelse.verdier.map((ytelse) => (
                            <FormSummary.Value key={ytelse.verdi}>{ytelse.label}</FormSummary.Value>
                        ))}
                    </FormSummary.Answer>
                )}
                {hovedytelse.arbeidOgOpphold && (
                    <ArbeidOgOppholdOppsummering arbeidOgOpphold={hovedytelse.arbeidOgOpphold} />
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default HovedytelseOppsummering;
