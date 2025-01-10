import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import ArbeidOgOppholdOppsummering from './ArbeidOgOpphold';
import { RouteTilPath } from '../../../læremidler/routing/routesLæremidler';
import { fellesOppsummeringTekster } from '../../../tekster/oppsummering';
import { Hovedytelse } from '../../../typer/søknad';
import { OppsummeringPanelHeader } from '../OppsummeringPanelHeader';

const HovedytelseOppsummering: React.FC<{ hovedytelse: Hovedytelse }> = ({ hovedytelse }) => (
    <OppsummeringPanelHeader
        tittel={fellesOppsummeringTekster.hovedytelse_tittel}
        lenke={RouteTilPath.HOVEDYTELSE}
    >
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
    </OppsummeringPanelHeader>
);

export default HovedytelseOppsummering;
