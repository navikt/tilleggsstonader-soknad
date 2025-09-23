import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { OppsummeringPanelHeader } from './OppsummeringPanelHeader';
import { fellesOppsummeringTekster } from '../../tekster/oppsummering';
import { DokumentasjonFelt } from '../../typer/skjema';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

export const VedleggOppsummering: React.FC<{
    dokumentasjon: DokumentasjonFelt[];
    redigerLenke: string;
}> = ({ dokumentasjon, redigerLenke }) => (
    <OppsummeringPanelHeader tittel={fellesOppsummeringTekster.vedlegg_tittel} lenke={redigerLenke}>
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
    </OppsummeringPanelHeader>
);
