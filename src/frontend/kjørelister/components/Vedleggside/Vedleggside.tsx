import React, { useState } from 'react';

import { Alert, BodyShort, Checkbox, Heading, VStack } from '@navikt/ds-react';

import { RouteKjørelste } from '../../routesKjørelistes';
import KjørelisteNavigasjonsKnapper from '../KjørelisteNavigasjonsKnapper';
import Oppsummering from './Oppsummering';
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
                    Oppsummering
                </Heading>
                <BodyShort>
                    Vennligst sjekk at du har markert riktige dager og fylt inn pris på parkeringen
                    der det er relevant. Du kan gå tilbake og rette opp hvis noe ikke stemmer.
                </BodyShort>
                <Alert variant={'info'}>Kjørelisten er ikke sendt inn.</Alert>
            </VStack>
            <Oppsummering />
            <Filopplaster
                opplastedeVedlegg={opplastedeFiler}
                tittel={'Vedlegg parkeringsutgift (obligatorisk)'}
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
            <Checkbox>
                Jeg er kjent med at jeg kan miste retten til stønad hvis jeg oppgir feilaktige
                opplysninger, og jeg er klar over at jeg må betale tilbake hvis jeg får utbetalt mer
                enn jeg har krav på. Jeg aksepterer også at NAV kan innhente opplysninger som er
                nødvendige for å behandle søknaden min.
            </Checkbox>
            <KjørelisteNavigasjonsKnapper
                nesteRoute={RouteKjørelste.KVITTERING}
                forrigeRoute={RouteKjørelste.SKJEMA}
            />
        </VStack>
    );
};

export default Vedleggside;
