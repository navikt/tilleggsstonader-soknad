import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FormSummary } from '@navikt/ds-react';

import { RouteTilPath } from '../../læremidler/routing/routesLæremidler';
import { fellesOppsummeringTekster } from '../../tekster/oppsummering';
import { DokumentasjonFelt } from '../../typer/skjema';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

const VedleggOppsummering: React.FC<{ dokumentasjon: DokumentasjonFelt[] }> = ({
    dokumentasjon,
}) => {
    const navigate = useNavigate();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <LocaleTekst tekst={fellesOppsummeringTekster.vedlegg_tittel} />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={() => navigate(RouteTilPath.VEDLEGG)}>
                    <LocaleTekst tekst={fellesOppsummeringTekster.endre_knapp} />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                {dokumentasjon.map((dokument) => (
                    <FormSummary.Answer key={dokument.label}>
                        <FormSummary.Label>{dokument.label}</FormSummary.Label>
                        {dokument.opplastedeVedlegg.length > 0 ? (
                            dokument.opplastedeVedlegg.map((vedlegg) => (
                                <FormSummary.Value key={vedlegg.id}>
                                    {vedlegg.navn}
                                </FormSummary.Value>
                            ))
                        ) : (
                            <FormSummary.Value>
                                <LocaleTekst tekst={fellesOppsummeringTekster.ingen_vedlegg} />
                            </FormSummary.Value>
                        )}
                    </FormSummary.Answer>
                ))}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default VedleggOppsummering;
