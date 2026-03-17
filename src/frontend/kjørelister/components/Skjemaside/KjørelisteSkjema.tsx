import React from 'react';

import { VStack } from '@navikt/ds-react';

import { Kjøreliste } from './Kjøreliste';
import { KjørelisteMetadata } from './KjørelisteMetadata';
import { SlikFyllerDuUtKjørelister } from './SlikFyllerDuUtKjørelister';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { useKjøreliste } from '../../KjørelisteContext';
import { KjørelisteRoutes } from '../../kjørelisteRoutes';
import { KjørelisteNavigasjonsKnapper } from '../KjørelisteNavigasjonsKnapper';

export function KjørelisteSkjema() {
    const { kjøreliste } = useKjøreliste();
    const { settValideringsfeil } = useValideringsfeil();

    const validerKanGåVidere = () => {
        const feil = Object.fromEntries(
            kjøreliste.reisedagerPerUkeAvsnitt.flatMap((ukeMedReisedager) =>
                ukeMedReisedager.reisedager
                    .filter((reisedag) => (reisedag.parkeringsutgift.verdi ?? 0) < 0)
                    .map((reisdag) => [
                        reisdag.dato.verdi,
                        {
                            id: reisdag.dato.verdi,
                            melding: 'Utgiften må være større enn 0',
                        },
                    ])
            )
        );

        settValideringsfeil(feil);

        return Object.keys(feil).length === 0;
    };

    return (
        <VStack gap="space-32">
            <KjørelisteMetadata />
            <SlikFyllerDuUtKjørelister />
            <Kjøreliste />
            <KjørelisteNavigasjonsKnapper
                nesteSide={KjørelisteRoutes.VEDLEGG}
                forrigeSide={KjørelisteRoutes.LANDINGSSIDE}
                validerKanGåVidere={validerKanGåVidere}
            />
        </VStack>
    );
}
