import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { RouteTilPath } from '../../routing/routesReiseOppstartAvslutningHjemreise';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { BarnOgSærligeBehovReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

export const BarnOgSærligeBehovOppsummering: React.FC<{
    barnOgSærligeBehov: BarnOgSærligeBehovReiseOppstartAvslutningHjemreise;
}> = ({ barnOgSærligeBehov }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.barn_og_særlige_behov_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <OppsummeringSvar felt={barnOgSærligeBehov.harBarnUnder18SomHarFlyttetMed} />
                <OppsummeringSvar felt={barnOgSærligeBehov.hvilkeBarnFlytterMed} />
                <OppsummeringSvar felt={barnOgSærligeBehov.harBarnHjemmeUnder4Klasse} />
                <OppsummeringSvar felt={barnOgSærligeBehov.harSærligeBehovForFlereHjemreiser} />
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.BARN_OG_SÆRLIGE_BEHOV} />
        </FormSummary>
    );
};
