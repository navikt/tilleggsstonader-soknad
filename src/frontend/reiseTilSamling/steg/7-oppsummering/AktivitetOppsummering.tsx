import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { AktivitetReiseTilSamling } from '../../typer/aktivitet';

export const AktivitetOppsummering: React.FC<{
    aktivitet: AktivitetReiseTilSamling;
}> = ({ aktivitet }) => {
    const tilleggsopplysninger = aktivitet.tilleggsopplysningerAnnenAktivitet;

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
                <OppsummeringSvar felt={aktivitet.annenAktivitetTypeUtdanning} />
                <OppsummeringSvar felt={tilleggsopplysninger?.erLærlingEllerLiknende} />
                <OppsummeringSvar felt={tilleggsopplysninger?.fårDekketReise} />
                <OppsummeringSvar felt={tilleggsopplysninger?.erUnder25År} />
                <OppsummeringSvar felt={tilleggsopplysninger?.måBetaleForReiseTilSkole} />
                <OppsummeringSvar felt={aktivitet.lønnetAktivitet} />
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.AKTIVITET} />
        </FormSummary>
    );
};
