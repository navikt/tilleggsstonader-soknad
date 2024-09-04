import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Alert, BodyLong, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';

import { kvitteringTekster } from '../../tekster/kvittering';
import { formaterNullableIsoDatoTid } from '../../utils/formatering';
import { Container } from '../Side';
import LocaleInlineLenke from '../Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

const Kvittering: React.FC<{ pathTilForside: string }> = ({ pathTilForside }) => {
    const locationState = useLocation().state;
    const navigate = useNavigate();

    useEffect(() => {
        if (locationState === null) {
            navigate(pathTilForside);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationState]);

    if (locationState == null) {
        return null;
    }

    return (
        <Container>
            <VStack gap="4">
                <Heading size="large">
                    <LocaleTekst tekst={kvitteringTekster.tittel} />
                </Heading>
                <Alert variant="success">
                    <LocaleTekst tekst={kvitteringTekster.søknad_innsendt_alert} />
                </Alert>
                <BodyShort>
                    <LocaleTekst
                        tekst={kvitteringTekster.søknad_mottatt_tidspunkt}
                        argument0={formaterNullableIsoDatoTid(locationState.innsendtTidspunkt)}
                    />
                </BodyShort>
                <BodyLong>
                    <LocaleTekst tekst={kvitteringTekster.mer_info_kontakt} />
                </BodyLong>
                <BodyLong>
                    <LocaleTekst tekst={kvitteringTekster.varsel_info} />
                </BodyLong>
            </VStack>

            <Button
                as="a"
                href="https://www.nav.no/min-side"
                target="_blank"
                style={{ maxWidth: 'fit-content' }}
            >
                <LocaleTekst tekst={kvitteringTekster.se_søknad_knapp} />
            </Button>

            <VStack gap="4">
                <Heading size="medium">
                    <LocaleTekst tekst={kvitteringTekster.behandlingstid_tittel} />
                </Heading>
                <BodyLong>
                    <LocaleInlineLenke tekst={kvitteringTekster.behandlingstid_innhold} />
                </BodyLong>
            </VStack>

            <VStack gap="4">
                <Heading size="medium">
                    <LocaleTekst tekst={kvitteringTekster.kontakt_oss_tittel} />
                </Heading>
                <BodyLong>
                    <LocaleInlineLenke tekst={kvitteringTekster.kontakt_oss_innhold} />
                </BodyLong>
            </VStack>

            <VStack gap="4">
                <Heading size="medium">
                    <LocaleTekst tekst={kvitteringTekster.vilkår_tittel} />
                </Heading>
                <BodyLong>
                    <LocaleInlineLenke tekst={kvitteringTekster.vilkår_innhold} />
                </BodyLong>
            </VStack>

            <VStack gap="4">
                <Heading size="medium">
                    <LocaleTekst tekst={kvitteringTekster.relevante_stønader_tittel} />
                </Heading>
                <BodyLong>
                    <LocaleInlineLenke tekst={kvitteringTekster.relevante_stønader_innhold} />
                </BodyLong>
            </VStack>
        </Container>
    );
};

export default Kvittering;
