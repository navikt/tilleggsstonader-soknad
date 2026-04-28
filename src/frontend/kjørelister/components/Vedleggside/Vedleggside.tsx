import React from 'react';

import { Alert, Heading, VStack } from '@navikt/ds-react';

import {
    finnVedleggMedParkeringsutgifter,
    harUtgiftOver100krIGjeldendeInnsending,
} from './VedleggUtils';
import { Filopplaster } from '../../../components/Filopplaster/Filopplaster';
import { useKjøreliste } from '../../KjørelisteContext';
import { KjørelisteRoutes } from '../../kjørelisteRoutes';
import { KjørelisteNavigasjonsKnapper } from '../KjørelisteNavigasjonsKnapper';

export const Vedleggside = () => {
    const { kjøreliste, leggTilDokument, slettDokument } = useKjøreliste();

    return (
        <VStack gap="space-32">
            <VStack gap="space-8">
                <Heading size={'medium'} level={'2'}>
                    Vedlegg
                </Heading>
            </VStack>
            <Filopplaster
                opplastedeVedlegg={finnVedleggMedParkeringsutgifter(kjøreliste)}
                tittel={`Vedlegg parkeringsutgift (${harUtgiftOver100krIGjeldendeInnsending(kjøreliste) ? 'obligatorisk' : 'valgfri'})`}
                leggTilDokument={leggTilDokument}
                slettDokument={slettDokument}
            />
            {harUtgiftOver100krIGjeldendeInnsending(kjøreliste) && (
                <Alert variant={'warning'}>
                    Du må legge ved dokumentasjon for de dagene hvor parkeringsutgiften overskrider
                    100kr før du sender inn kjørelisten. Hvis du ikke gjør det, kan det hende at du
                    ikke får refundert utgiften.
                </Alert>
            )}

            <KjørelisteNavigasjonsKnapper
                nesteSide={KjørelisteRoutes.OPPSUMMERING}
                forrigeSide={KjørelisteRoutes.SKJEMA}
            />
        </VStack>
    );
};
