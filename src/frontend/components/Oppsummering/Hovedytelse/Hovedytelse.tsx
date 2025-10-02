import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import ArbeidOgOppholdOppsummering from './ArbeidOgOpphold';
import { fellesOppsummeringTekster } from '../../../tekster/oppsummering';
import { Hovedytelse } from '../../../typer/søknad';
import LocaleTekst from '../../Teksthåndtering/LocaleTekst';
import { FormSummaryFooterMedEndreKnapp } from '../FormSummaryFooterMedEndreKnapp';

export const HovedytelseOppsummering: React.FC<{
    hovedytelse: Hovedytelse;
    redigerLenke: string;
}> = ({ hovedytelse, redigerLenke }) => (
    <FormSummary>
        <FormSummary.Header>
            <FormSummary.Heading level={'3'}>
                <LocaleTekst tekst={fellesOppsummeringTekster.hovedytelse_tittel} />
            </FormSummary.Heading>
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
        <FormSummaryFooterMedEndreKnapp lenke={redigerLenke} />
    </FormSummary>
);
