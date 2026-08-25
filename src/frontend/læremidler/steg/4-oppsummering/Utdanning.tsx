import React from 'react';

import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { RouteTilPath } from '../../routing/routesLæremidler';
import { oppsummeringTekster } from '../../tekster/oppsummering';
import { Utdanning } from '../../typer/søknad';

export const UtdanningOppsummering: React.FC<{ utdanning: Utdanning }> = ({ utdanning }) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="3">
                    <LocaleTekst tekst={oppsummeringTekster.utdanning_tittel} />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <OppsummeringSvar felt={utdanning.aktiviteter} />
                <OppsummeringSvar felt={utdanning.annenUtdanning} />
                <OppsummeringSvar
                    felt={utdanning.harRettTilUtstyrsstipend?.erLærlingEllerLiknende}
                />
                <OppsummeringSvar
                    felt={utdanning.harRettTilUtstyrsstipend?.harTidligereFullførtVgs}
                />
                <OppsummeringSvar
                    felt={utdanning.harRettTilUtstyrsstipend?.tarOpplæringVgsSamtidig}
                />
                <OppsummeringSvar felt={utdanning.harFunksjonsnedsettelse} />
            </FormSummary.Answers>
            <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.UTDANNING} />
        </FormSummary>
    );
};
