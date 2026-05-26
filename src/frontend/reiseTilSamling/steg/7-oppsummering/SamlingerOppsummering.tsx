import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
import { Samling } from '../../../typer/søknad';
import { formaterIsoDato } from '../../../utils/formateringUtils';
import { harVerdi } from '../../../utils/typeUtils';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const SamlingerOppsummering: React.FC<{ samlinger: Samling[] }> = ({ samlinger }) => {
    const samlingerMedDatoer = samlinger.filter(
        (s) => harVerdi(s.fom?.verdi) && harVerdi(s.tom?.verdi)
    );

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.samlinger_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {samlingerMedDatoer.map((samling, index) => (
                    <FormSummary.Answer key={samling._id}>
                        <FormSummary.Label>Samling {index + 1}</FormSummary.Label>
                        <FormSummary.Value>
                            {samling.fom && samling.tom
                                ? `${formaterIsoDato(samling.fom.verdi)} – ${formaterIsoDato(samling.tom.verdi)}`
                                : ''}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                ))}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.SAMLINGER} />
        </FormSummary>
    );
};
