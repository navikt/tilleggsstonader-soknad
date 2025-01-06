import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { OppsummeringPanelHeader } from './OppsummeringPanelHeader';
import { RouteTilPath } from '../../læremidler/routing/routesLæremidler';
import { fellesOppsummeringTekster } from '../../tekster/oppsummering';
import { DokumentasjonFelt } from '../../typer/skjema';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

const VedleggOppsummering: React.FC<{ dokumentasjon: DokumentasjonFelt[] }> = ({
    dokumentasjon,
}) => (
    <OppsummeringPanelHeader
        tittel={fellesOppsummeringTekster.vedlegg_tittel}
        lenke={RouteTilPath.VEDLEGG}
    >
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

export default VedleggOppsummering;
