import React from 'react';

import { VStack } from '@navikt/ds-react';

import { Kjøreliste } from './Kjøreliste';
import { KjørelisteMetadata } from './KjørelisteMetadata';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { useKjøreliste } from '../../KjørelisteContext';
import { KjørelisteNavigasjonsKnapper } from '../KjørelisteNavigasjonsKnapper';
import { SlikFyllerDuUtKjørelister } from './SlikFyllerDuUtKjørelister';
import { KjørelisteRoutes } from '../../kjørelisteRoutes';

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
        <VStack gap="8">
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
