import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { VerdiFelt } from '../../../typer/skjema';
import { Samling } from '../../../typer/søknad';
import { formaterIsoDato } from '../../../utils/formateringUtils';
import { harVerdi } from '../../../utils/typeUtils';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';

type ValidertSamling = Samling & {
    fom: VerdiFelt<string>;
    tom: VerdiFelt<string>;
    erObligatorisk: VerdiFelt<string>;
};

const erValidertSamling = (samling: Samling): samling is ValidertSamling =>
    harVerdi(samling.fom?.verdi) &&
    harVerdi(samling.tom?.verdi) &&
    harVerdi(samling.erObligatorisk?.verdi);

const samlingTilOppsummering = (samling: ValidertSamling): string =>
    `${formaterIsoDato(samling.fom.verdi)} - ${formaterIsoDato(samling.tom.verdi)} (${samling.erObligatorisk.verdi === 'JA' ? 'Obligatorisk' : 'Valgfri'})`;

export const SamlingerOppsummering: React.FC<{ samlinger: Samling[] }> = ({ samlinger }) => {
    const validerteSamlinger = samlinger.filter(erValidertSamling);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.samlinger_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {validerteSamlinger.map((samling, index) => (
                    <FormSummary.Answer key={samling._id}>
                        <FormSummary.Label>Samling {index + 1}</FormSummary.Label>
                        <FormSummary.Value>{samlingTilOppsummering(samling)}</FormSummary.Value>
                    </FormSummary.Answer>
                ))}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.SAMLINGER} />
        </FormSummary>
    );
};
