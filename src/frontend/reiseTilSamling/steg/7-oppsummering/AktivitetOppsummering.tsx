import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { EnumFelt, EnumFlereValgFelt } from '../../../typer/skjema';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { AktivitetReiseTilSamling } from '../../typer/aktivitet';

// TODO Senere, flytte denne til eget og gjenbruk i andre oppsummeringer
type OppsummeringSvarProps = {
    felt: EnumFelt<unknown> | EnumFlereValgFelt<unknown> | undefined;
    valuePostfix?: string;
};
export const OppsummeringSvar: React.FC<OppsummeringSvarProps> = ({ felt, valuePostfix }) => {
    if (!felt) {
        return null;
    }

    return (
        <FormSummary.Answer>
            <FormSummary.Label>{felt.label}</FormSummary.Label>
            <FormSummary.Value>
                {'verdier' in felt
                    ? felt.verdier.map((verdi) => verdi.label).join(', ')
                    : felt.svarTekst}
                {valuePostfix && ` ${valuePostfix}`}
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

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
