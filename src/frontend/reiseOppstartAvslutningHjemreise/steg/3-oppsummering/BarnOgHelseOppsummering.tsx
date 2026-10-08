import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { RouteTilPath } from '../../routing/routesReiseOppstartAvslutningHjemreise';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { BarnOgHelseReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

export const BarnOgHelseOppsummering: React.FC<{
    barnOgHelse: BarnOgHelseReiseOppstartAvslutningHjemreise;
}> = ({ barnOgHelse }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.barn_og_helse_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <OppsummeringSvar felt={barnOgHelse.harBarnUnder18SomHarFlyttetMed} />
                <OppsummeringSvar felt={barnOgHelse.hvilkeBarnFlytterMed} />
                <OppsummeringSvar felt={barnOgHelse.harBarnHjemmeUnder4Klasse} />
                <OppsummeringSvar felt={barnOgHelse.harSærligeBehovForFlereHjemreiser} />
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.BARN_OG_HELSE} />
        </FormSummary>
    );
};
