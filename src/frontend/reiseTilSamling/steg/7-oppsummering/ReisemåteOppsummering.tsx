import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import LocaleTekst from '../../../components/Teksthåndtering/LocaleTekst';
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
                {reisemåte.kanReiseKollektivt && (
                    <FormSummary.Answer>
                        <FormSummary.Label>{reisemåte.kanReiseKollektivt.label}</FormSummary.Label>
                        <FormSummary.Value>
                            {reisemåte.kanReiseKollektivt.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {reisemåte.totalutgifterKollektivt && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            {reisemåte.totalutgifterKollektivt.label}
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {reisemåte.totalutgifterKollektivt.verdi} kr
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {reisemåte.kanBenytteEgenBil && (
                    <FormSummary.Answer>
                        <FormSummary.Label>{reisemåte.kanBenytteEgenBil.label}</FormSummary.Label>
                        <FormSummary.Value>
                            {reisemåte.kanBenytteEgenBil.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
                {reisemåte.kanBenytteDrosje && (
                    <FormSummary.Answer>
                        <FormSummary.Label>{reisemåte.kanBenytteDrosje.label}</FormSummary.Label>
                        <FormSummary.Value>
                            {reisemåte.kanBenytteDrosje.svarTekst}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.REISEMÅTE} />
        </FormSummary>
    );
};
