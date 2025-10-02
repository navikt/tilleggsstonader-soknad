import React from 'react';

import { Alert, Heading, VStack } from '@navikt/ds-react';

import { KjørelisteSider } from '../../kjørelisteSider';
import { KjørelisteNavigasjonsKnapper } from '../KjørelisteNavigasjonsKnapper';
import { harUtgiftOver100kr } from './VedleggUtils';
import { Filopplaster } from '../../../components/Filopplaster/Filopplaster';
import { Dokument } from '../../../typer/skjema';
import { useKjøreliste } from '../../KjørelisteContext';

export const Vedleggside = () => {
    const { kjøreliste, dokumentasjon, setDokumentasjon } = useKjøreliste();

    const leggTilDokument = (dokument: Dokument) => {
        setDokumentasjon((prevState) => [...prevState, dokument]);
    };

    const slettDokument = (dokumentId: string) => {
        setDokumentasjon((prevState) =>
            prevState.filter((opplastetDokument) => opplastetDokument.id !== dokumentId)
        );
    };

    return (
        <VStack gap={'8'}>
            <VStack gap={'2'}>
                <Heading size={'medium'} level={'2'}>
                    Vedlegg
                </Heading>
            </VStack>
            <Filopplaster
                opplastedeVedlegg={dokumentasjon}
                tittel={`Vedlegg parkeringsutgift (${harUtgiftOver100kr(kjøreliste) ? 'obligatorisk' : 'valgfri'})`}
                leggTilDokument={leggTilDokument}
                slettDokument={slettDokument}
            />
            {harUtgiftOver100kr(kjøreliste) && (
                <Alert variant={'warning'}>
                    Du må legge ved dokumentasjon for de dagene hvor parkeringsutgiften overskrider
                    100kr før du sender inn kjørelisten. Hvis du ikke gjør det, kan det hende at du
                    ikke får refundert utgiften.
                </Alert>
            )}

            <KjørelisteNavigasjonsKnapper
                nesteSide={KjørelisteSider.OPPSUMMERING}
                forrigeSide={KjørelisteSider.SKJEMA}
            />
        </VStack>
    );
};
