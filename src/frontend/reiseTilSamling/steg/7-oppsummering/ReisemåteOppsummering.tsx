import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { Reisemåte } from '../../../typer/søknad';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';

export const ReisemåteOppsummering: React.FC<{ reisemåte: Reisemåte }> = ({ reisemåte }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.reisemåte_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <OppsummeringSvar felt={reisemåte.kanReiseMedOffentligTransport} />
                <OppsummeringSvar
                    felt={reisemåte.totalUtgifterOffentligTransport}
                    valuePostfix="kr"
                />
                <OppsummeringSvar felt={reisemåte.kanIkkeReiseMedOffentligTransportBegrunnelser} />
                <OppsummeringSvar felt={reisemåte.kanBenytteEgenBil} />
                <OppsummeringSvar felt={reisemåte.kanIkkeBenytteEgenBilBegrunnelser} />
                <OppsummeringSvar felt={reisemåte.egenBilUtgifter?.drivstoffType} />
                <OppsummeringSvar felt={reisemåte.egenBilUtgifter?.bompenger} valuePostfix="kr" />
                <OppsummeringSvar felt={reisemåte.egenBilUtgifter?.ferge} valuePostfix="kr" />
                <OppsummeringSvar
                    felt={reisemåte.egenBilUtgifter?.piggdekkavgift}
                    valuePostfix="kr"
                />
                <OppsummeringSvar felt={reisemåte.kanBenytteDrosje} />
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.REISEMÅTE} />
        </FormSummary>
    );
};
