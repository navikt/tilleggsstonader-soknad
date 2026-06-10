import React from 'react';

import { VStack } from '@navikt/ds-react';

import { Kjøreliste } from './Kjøreliste';
import { KjørelisteMetadata } from './KjørelisteMetadata';
import { SlikFyllerDuUtKjørelister } from './SlikFyllerDuUtKjørelister';
import { useValideringsfeil } from '../../../context/ValideringsfeilContext';
import { Valideringsfeil } from '../../../typer/validering';
import { useKjøreliste } from '../../KjørelisteContext';
import { KjørelisteRoutes } from '../../kjørelisteRoutes';
import { KjørelisteNavigasjonsKnapper } from '../KjørelisteNavigasjonsKnapper';

export function KjørelisteSkjema() {
    const { kjøreliste } = useKjøreliste();
    const { settValideringsfeil } = useValideringsfeil();

    const validerKanGåVidere = () => {
        const feil: Valideringsfeil = {};

        const ukerKlarForUtfylling = kjøreliste.reisedagerPerUkeAvsnitt.filter(
            (uke) => !uke.sendtInnTidligere
        );

        const harMinstEnUtfyltReisedag = ukerKlarForUtfylling.some((ukeMedReisedager) =>
            ukeMedReisedager.reisedager.some(
                (reisedag) => reisedag.harKjørt || reisedag.parkeringsutgift.verdi != null
            )
        );

        if (ukerKlarForUtfylling.length > 0 && !harMinstEnUtfyltReisedag) {
            feil.reisedager = {
                id: 'klart-til-innsending',
                melding: 'Du må fylle ut minst én reisedag',
            };
        }

        ukerKlarForUtfylling.forEach((ukeMedReisedager) => {
            ukeMedReisedager.reisedager
                .filter((reisedag) => (reisedag.parkeringsutgift.verdi ?? 0) < 0)
                .forEach((reisdag) => {
                    feil[reisdag.dato.verdi] = {
                        id: reisdag.dato.verdi,
                        melding: 'Utgiften må være større enn 0',
                    };
                });
        });

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
