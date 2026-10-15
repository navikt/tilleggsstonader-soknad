import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { Answer, GruppertAnswer } from '../../../components/Oppsummering/Answer';
import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { ReisemåteOppsummering } from '../../../components/Oppsummering/ReisemåteOppsummering';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { formaterIsoDato, formaterPeriodeTekstlig } from '../../../utils/formateringUtils';
import { RouteTilPath } from '../../routing/routesReiseOppstartAvslutningHjemreise';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { reiseinfoTekster } from '../../tekster/reiseinfo';
import { ReiseInfoReiseOppstartAvslutningHjemreise } from '../../typer/søknad';

const labelForReise = (reise: ReiseInfoReiseOppstartAvslutningHjemreise): string => {
    if (reise.typeReise?.verdi === 'HJEMREISE') {
        return `Reise (${formaterPeriodeTekstlig(reise.fom?.verdi, reise.tom?.verdi)})`;
    }

    return `Reise (${reise.fom?.verdi ? formaterIsoDato(reise.fom.verdi) : ''})`;
};

export const ReiseinfoOppsummering: React.FC<{
    reiser: ReiseInfoReiseOppstartAvslutningHjemreise[];
}> = ({ reiser }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.reiseinfo_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {reiser.map((reise) => (
                    <GruppertAnswer label={labelForReise(reise)} key={reise._id}>
                        <OppsummeringSvar felt={reise.typeReise} />
                        {reise.typeReise?.verdi === 'HJEMREISE' ? (
                            <Answer label={reiseinfoTekster.dato_periode.label}>
                                {formaterPeriodeTekstlig(reise.fom?.verdi, reise.tom?.verdi)}
                            </Answer>
                        ) : (
                            <OppsummeringSvar felt={reise.fom} />
                        )}
                        {reise.reisemåte && <ReisemåteOppsummering reisemåte={reise.reisemåte} />}
                    </GruppertAnswer>
                ))}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.REISEINFO} />
        </FormSummary>
    );
};
