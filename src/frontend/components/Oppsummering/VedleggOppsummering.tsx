import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from './FormSummaryFooterMedEndreKnapp';
import { fellesOppsummeringTekster } from '../../tekster/oppsummering';
import { DokumentasjonFelt } from '../../typer/skjema';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

export const VedleggOppsummering: React.FC<{
    dokumentasjon: DokumentasjonFelt[];
    redigerLenke: string;
}> = ({ dokumentasjon, redigerLenke }) => (
    <FormSummary>
        <FormSummary.Header>
            <FormSummary.Heading level="3">
                <LocaleTekst tekst={fellesOppsummeringTekster.vedlegg_tittel} />
            </FormSummary.Heading>
        </FormSummary.Header>
        <FormSummary.Answers>
            {dokumentasjon.map((dokument) => (
                <FormSummary.Answer key={dokument.label}>
                    <FormSummary.Label>{dokument.label}</FormSummary.Label>
                    {dokument.opplastedeVedlegg.length > 0 ? (
                        dokument.opplastedeVedlegg.map((vedlegg) => (
                            <FormSummary.Value key={vedlegg.id}>{vedlegg.navn}</FormSummary.Value>
                        ))
                    ) : (
                        <FormSummary.Value>
                            <LocaleTekst tekst={fellesOppsummeringTekster.ingen_vedlegg} />
                        </FormSummary.Value>
                    )}
                </FormSummary.Answer>
            ))}
        </FormSummary.Answers>
        <FormSummaryFooterMedEndreKnapp lenke={redigerLenke} />
    </FormSummary>
);
