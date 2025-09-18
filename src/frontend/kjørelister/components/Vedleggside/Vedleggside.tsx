import React, { useState } from 'react';

import { Alert, Heading, VStack } from '@navikt/ds-react';

import { RouteKjørelste } from '../../routesKjørelistes';
import KjørelisteNavigasjonsKnapper from '../KjørelisteNavigasjonsKnapper';
import { harUtgiftOver100kr } from './VedleggUtils';
import { Filopplaster } from '../../../components/Filopplaster/Filopplaster';
import { Dokument } from '../../../typer/skjema';
import { useKjøreliste } from '../../KjørelisteContext';

const Vedleggside = () => {
    const { kjøreliste } = useKjøreliste();
    const [opplastedeFiler, setOpplastedeFiler] = useState<Dokument[]>([]);

    const leggTilDokuement = (dokument: Dokument) => {
        //TODO legg til logikk for å laste opp vedlegg
        setOpplastedeFiler((prevState) => [...prevState, dokument]);
    };

    const slettDokument = (dokuemntId: string) => {
        //TODO legg til logikk for å slette vedlegg
        setOpplastedeFiler((prevState) =>
            prevState.filter((dokuemnt) => dokuemnt.id !== dokuemntId)
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
                opplastedeVedlegg={opplastedeFiler}
                tittel={`Vedlegg parkeringsutgift (${harUtgiftOver100kr(kjøreliste) ? 'obligatorisk' : 'valgfri'})`}
                leggTilDokument={leggTilDokuement}
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
                nesteRoute={RouteKjørelste.OPPSUMMERING}
                forrigeRoute={RouteKjørelste.SKJEMA}
            />
        </VStack>
    );
};

export default Vedleggside;
