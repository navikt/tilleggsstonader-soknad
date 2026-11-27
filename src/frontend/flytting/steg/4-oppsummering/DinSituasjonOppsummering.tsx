import { FormSummary } from '@navikt/ds-react';

import { FormSummaryFooterMedEndreKnapp } from '../../../components/Oppsummering/FormSummaryFooterMedEndreKnapp';
import { HovedytelseSvar } from '../../../components/Oppsummering/Hovedytelse/Hovedytelse';
import { OppsummeringSvar } from '../../../components/Oppsummering/OppsummeringSvar';
import { LocaleTekst } from '../../../components/Teksthåndtering/LocaleTekst';
import { fellesOppsummeringTekster } from '../../../tekster/oppsummering';
import { Hovedytelse } from '../../../typer/søknad';
import { RouteTilPath } from '../../routing/routesFlytting';
import { Arbeidssøker } from '../../typer/arbeidssøker';

export const DinSituasjonOppsummering = ({
    hovedytelse,
    arbeidssøker,
}: {
    hovedytelse: Hovedytelse;
    arbeidssøker: Arbeidssøker | undefined;
}) => (
    <FormSummary>
        <FormSummary.Header>
            <FormSummary.Heading level="3">
                <LocaleTekst tekst={fellesOppsummeringTekster.hovedytelse_tittel} />
            </FormSummary.Heading>
        </FormSummary.Header>
        <FormSummary.Answers>
            <HovedytelseSvar hovedytelse={hovedytelse} />
            <OppsummeringSvar felt={arbeidssøker?.registrertSomArbeidssøker} />
        </FormSummary.Answers>
        <FormSummaryFooterMedEndreKnapp lenke={RouteTilPath.HOVEDYTELSE} />
    </FormSummary>
);
