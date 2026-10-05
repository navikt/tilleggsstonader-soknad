import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { RouteTilPath } from '../../routing/routesReiseOppstartAvslutningHjemreise';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { AktivitetReiseOppstartAvslutningHjemreise } from '../../typer/aktivitet';

export const AktivitetOppsummering: React.FC<{
    aktivitet: AktivitetReiseOppstartAvslutningHjemreise;
}> = ({ aktivitet }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.aktivitet_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <OppsummeringSvar felt={aktivitet.aktiviteter} />
                <OppsummeringSvar felt={aktivitet.annenAktivitet} />
                <OppsummeringSvar felt={aktivitet.lønnetAktivitet} />
                <OppsummeringSvar felt={aktivitet.måBoBorteHjemmefra} />
                <OppsummeringSvar felt={aktivitet.harBarnUnder18SomHarFlyttetMed} />
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.AKTIVITET} />
        </FormSummary>
    );
};
