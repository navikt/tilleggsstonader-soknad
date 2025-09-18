import React from 'react';

import { Alert, BodyShort, Button, Heading, Link, VStack } from '@navikt/ds-react';

import { tilTekstligDato } from '../../../utils/datoUtils';
import { RouteKjørelste } from '../../routesKjørelistes';
import KjørelisteNavigasjonsKnapper from '../KjørelisteNavigasjonsKnapper';

const Kvitteringsside = () => {
    //TODO mottatTidspunkt bør være når vi lagrer ned søknaden
    const mottatTidspunkt = new Date();
    //TODO få faktisk saksnummer fra backend
    const saksnummer = '1234567';

    return (
        <VStack gap={'8'}>
            <Heading size={'medium'} level={'2'}>
                Kvittering
            </Heading>
            <Alert variant={'success'}>
                <BodyShort>Kjøreliste er sendt inn</BodyShort>
            </Alert>
            <VStack>
                <BodyShort>{`Motatt av Nav: ${tilTekstligDato(mottatTidspunkt.toISOString())}`}</BodyShort>
                <BodyShort>{`Saksnummer: ${saksnummer}`}</BodyShort>
            </VStack>
            <BodyShort>
                Vi vil ta kontakt med deg på telefon eller via Min side på nav.no hvis vi trenger
                mer informasjon eller dokumentasjon fra deg.
            </BodyShort>
            <BodyShort>Du får varsel på SMS eller e-post når saken er ferdig behandlet.</BodyShort>
            <Button as="a" href="https://www.nav.no/min-side" target="_blank">
                Se kjørelistene dine på Min side
            </Button>

            <VStack>
                <Heading size={'medium'} level={'3'}>
                    Forventet behandlingstid
                </Heading>
                <BodyShort>
                    Vi gjør vårt beste for å behandle kjørelistene dine så snart som mulig.{' '}
                    <Link href={'https://www.nav.no/saksbehandlingstider#tilleggsstonader'}>
                        Se forventet saksbehandlingstid
                    </Link>
                    .
                </BodyShort>
            </VStack>

            <VStack>
                <Heading size={'medium'} level={'3'}>
                    Kontakt oss
                </Heading>
                <BodyShort>
                    Kontakt oss på <Link href={'https://nav.no/kontaktoss'}>nav.no/kontaktoss</Link>{' '}
                    eller på telefon 55 55 33 33 hvis du har spørsmål eller vil melde fra om
                    endringer eller feil.
                </BodyShort>
            </VStack>

            <VStack>
                <Heading size={'medium'} level={'3'}>
                    Vilkår og betingelser
                </Heading>
                <BodyShort>
                    Hvis du ønsker informasjon om hvordan vi behandler kjørelistene din eller
                    informasjon om vilkårene for støtte til daglig reise, kan du{' '}
                    <Link href={'https://www.nav.no/tilleggsstonader#stotte'}>lese om det her</Link>
                    .
                </BodyShort>
            </VStack>

            <KjørelisteNavigasjonsKnapper
                nesteRoute={RouteKjørelste.LANDINGSSIDE}
                forrigeRoute={RouteKjørelste.OPPSUMMERING}
            />
        </VStack>
    );
};

export default Kvitteringsside;
