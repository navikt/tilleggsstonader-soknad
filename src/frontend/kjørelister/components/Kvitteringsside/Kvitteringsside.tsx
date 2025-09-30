import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Alert, BodyShort, Button, Heading, Link, VStack } from '@navikt/ds-react';

import { formaterNullableIsoDatoTid } from '../../../utils/formateringUtils';
import { KjørelisteRoutes } from '../../kjørelisteRoutes';
import { KjørelisteNavigasjonsKnapper } from '../KjørelisteNavigasjonsKnapper';

export const Kvitteringsside = () => {
    const locationState = useLocation().state;
    const navigate = useNavigate();

    useEffect(() => {
        if (locationState === null) {
            navigate(KjørelisteRoutes.LANDINGSSIDE);
        }
    }, [locationState, navigate]);

    if (locationState == null) {
        return null;
    }

    return (
        <VStack gap={'8'}>
            <Heading size={'medium'} level={'2'}>
                Kvittering
            </Heading>
            <Alert variant={'success'}>
                <BodyShort>Kjøreliste er sendt inn</BodyShort>
            </Alert>
            <VStack>
                <BodyShort>{`Motatt av Nav: ${formaterNullableIsoDatoTid(locationState.mottattTidspunkt)}`}</BodyShort>
                <BodyShort>{`Saksnummer: ${locationState.saksnummer}`}</BodyShort>
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
                nesteSide={KjørelisteRoutes.LANDINGSSIDE}
                forrigeSide={KjørelisteRoutes.OPPSUMMERING}
            />
        </VStack>
    );
};
