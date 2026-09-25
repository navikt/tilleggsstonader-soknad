import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { RouteTilPath } from '../../routing/routesReiseTilSamling';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { Reisemåte } from '../../typer/reisemåte';

export const ReisemåteOppsummering: React.FC<{ reisemåte: Reisemåte }> = ({ reisemåte }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.reisemåte_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {/* TODO: Oppdater oppsummering etter flytting over til samling */}
                <OppsummeringSvar felt={reisemåte.hvilkeTransportmidlerBleBenyttet} />
                {/*<OppsummeringSvar
                    felt={reisemåte.offentligTransport?.totalUtgifterOffentligTransport}
                    valuePostfix="kr"
                />
                <OppsummeringSvar felt={reisemåte.privatBil?.unntakFraOffentligTransport} />
                <OppsummeringSvar
                    felt={reisemåte.privatBil?.leveringOgHentingIBarnehage?.gateadresse}
                />
                <OppsummeringSvar
                    felt={reisemåte.privatBil?.leveringOgHentingIBarnehage?.postnummer}
                />
                <OppsummeringSvar felt={reisemåte.privatBil?.kanBenytteEgenBil} />
                <OppsummeringSvar felt={reisemåte.taxi?.unntakFraPrivatBil} />
                <OppsummeringSvar felt={reisemåte.privatBil?.betalerForReiseSelv} />
                <OppsummeringSvar felt={reisemåte.taxi?.ønskerDekketUtgifterForDrosje} />
                <OppsummeringSvar felt={reisemåte.taxi?.harTTKort} />
                <OppsummeringSvar felt={reisemåte.privatBil?.utgifterPrivatBil?.drivstoffType} />
                <OppsummeringSvar
                    felt={reisemåte.privatBil?.utgifterPrivatBil?.bompenger}
                    valuePostfix="kr"
                />
                <OppsummeringSvar
                    felt={reisemåte.privatBil?.utgifterPrivatBil?.ferge}
                    valuePostfix="kr"
                />
                <OppsummeringSvar
                    felt={reisemåte.privatBil?.utgifterPrivatBil?.piggdekkavgift}
                    valuePostfix="kr"
                /> */}
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.REISEMÅTE} />
        </FormSummary>
    );
};
