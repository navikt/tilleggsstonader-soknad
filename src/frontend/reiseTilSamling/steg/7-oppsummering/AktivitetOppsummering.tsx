import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import {
    AktivitetReiseTilSamling,
    TilleggsopplysningerAnnenAktivitet,
} from '../../typer/aktivitet';

export const AktivitetOppsummering: React.FC<{
    aktivitet: Omit<AktivitetReiseTilSamling, 'tilleggsopplysningerAnnenAktivitet'>;
    tilleggsopplysninger: TilleggsopplysningerAnnenAktivitet | undefined;
}> = ({ aktivitet, tilleggsopplysninger }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.aktivitet_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {aktivitet.aktiviteter && (
                    <FormSummary.Answer>
                        <FormSummary.Label>{aktivitet.aktiviteter.label}</FormSummary.Label>
                        <FormSummary.Value>
                            {aktivitet.aktiviteter.verdier.map((verdi) => verdi.label).join(', ')}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {aktivitet.annenAktivitet && (
                    <FormSummary.Answer>
                        <FormSummary.Label>{aktivitet.annenAktivitet.label}</FormSummary.Label>
                        <FormSummary.Value>{aktivitet.annenAktivitet.svarTekst}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {aktivitet.annenAktivitetTypeUtdanning && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {aktivitet.annenAktivitetTypeUtdanning.label}
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {aktivitet.annenAktivitetTypeUtdanning.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {tilleggsopplysninger?.erLærlingEllerLiknende && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {tilleggsopplysninger.erLærlingEllerLiknende.label}
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {tilleggsopplysninger.erLærlingEllerLiknende.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {tilleggsopplysninger?.fårDekketReise && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {tilleggsopplysninger.fårDekketReise.label}
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {tilleggsopplysninger.fårDekketReise.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {tilleggsopplysninger?.erUnder25År && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {tilleggsopplysninger.erUnder25År.label}
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {tilleggsopplysninger.erUnder25År.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {tilleggsopplysninger?.måBetaleForReiseTilSkole && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {tilleggsopplysninger.måBetaleForReiseTilSkole.label}
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {tilleggsopplysninger.måBetaleForReiseTilSkole.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {aktivitet.lønnetAktivitet && (
                    <FormSummary.Answer>
                        <FormSummary.Label>{aktivitet.lønnetAktivitet.label}</FormSummary.Label>
                        <FormSummary.Value>{aktivitet.lønnetAktivitet.svarTekst}</FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.AKTIVITET} />
        </FormSummary>
    );
};
