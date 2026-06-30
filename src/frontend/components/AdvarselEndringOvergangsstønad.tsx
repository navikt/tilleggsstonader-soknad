import React from 'react';

import { Alert, BodyLong, Heading } from '@navikt/ds-react';

export const AdvarselEndringOvergangsstønad = () => {
    return (
        <Alert variant="info">
            <Heading size="small" spacing>
                Fra 1. juli 2026 er reglene for enslig mor eller far endret.
            </Heading>
            <BodyLong spacing>
                Du kan fortsatt få tilleggsstønader hvis du har rett til overgangsstønad etter
                reglene som gjaldt før 1. juli 2026, eller etter overgangsreglene. Hvis du har rett
                til overgangsstønad etter de nye reglene som gjelder fra 1. juli 2026, har du ikke
                rett til tilleggsstønader.
            </BodyLong>
            <BodyLong weight="semibold">Kan jeg få tilleggsstønader?</BodyLong>
            <BodyLong spacing>
                Hvis du har rett til overgangsstønad etter de gamle reglene eller etter
                overgangsreglene, kan du ha rett til tilleggsstønader.
            </BodyLong>
            <BodyLong>
                Hvis du har rett til overgangsstønad etter de nye reglene som gjelder fra 1. juli
                2026, har du ikke rett til tilleggsstønader.
            </BodyLong>
        </Alert>
    );
};
