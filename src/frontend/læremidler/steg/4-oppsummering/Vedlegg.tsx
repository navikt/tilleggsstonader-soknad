import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FormSummary } from '@navikt/ds-react';

import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { fellesOppsummeringTekster } from '../../../tekster/oppsummering';
import { DokumentasjonFelt } from '../../../typer/skjema';
import { RouteTilPath } from '../../routing/routesLæremidler';
import { oppsummeringTekster } from '../../tekster/oppsummering';

const VedleggOppsummering: React.FC<{ dokumentasjon: DokumentasjonFelt[] }> = ({
    dokumentasjon,
}) => {
    const navigate = useNavigate();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <LocaleTekst tekst={oppsummeringTekster.vedlegg_tittel} />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={() => navigate(RouteTilPath.VEDLEGG)}>
                    <LocaleTekst tekst={fellesOppsummeringTekster.endre_knapp} />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                {dokumentasjon.map((dokument) => (
                    <FormSummary.Answer>
                        <div>
                            <FormSummary.Label>{dokument.label}</FormSummary.Label>
                            {dokument.opplastedeVedlegg.length > 0 ? (
                                dokument.opplastedeVedlegg.map((vedlegg) => (
                                    <FormSummary.Value>{vedlegg.navn}</FormSummary.Value>
                                ))
                            ) : (
                                <FormSummary.Value>
                                    <LocaleTekst tekst={oppsummeringTekster.ingen_vedlegg} />
                                </FormSummary.Value>
                            )}
                        </div>
                    </FormSummary.Answer>
                ))}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default VedleggOppsummering;
