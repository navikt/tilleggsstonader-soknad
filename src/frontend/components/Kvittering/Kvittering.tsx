import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Alert, BodyLong, BodyShort, Button, VStack } from '@navikt/ds-react';

import { useSøknad } from '../../context/SøknadContext';
import { kvitteringTekster } from '../../tekster/kvittering';
import { formaterNullableIsoDatoTid } from '../../utils/formateringUtils';
import { Container } from '../Side';
import { LocaleHeading } from '../Teksthåndtering/LocaleHeading';
import LocaleInlineLenke from '../Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../Teksthåndtering/LocaleTekst';

const Kvittering: React.FC<{ pathTilForside: string }> = ({ pathTilForside }) => {
    const locationState = useLocation().state;
    const navigate = useNavigate();
    const { resetSøknadOgValideringsfeil } = useSøknad();

    useEffect(() => {
        resetSøknadOgValideringsfeil();
        // resetSøknadOgValideringsfeil initieres på nytt ved kall mot den
        // eslint-disable-next-line
    }, []);

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
                <LocaleHeading tekst={kvitteringTekster.tittel} size="large" level="2" />
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
                <LocaleHeading
                    tekst={kvitteringTekster.behandlingstid_tittel}
                    size="medium"
                    level="3"
                />
                <BodyLong>
                    <LocaleInlineLenke tekst={kvitteringTekster.behandlingstid_innhold} />
                </BodyLong>
            </VStack>
            <VStack gap="4">
                <LocaleHeading
                    tekst={kvitteringTekster.kontakt_oss_tittel}
                    size="medium"
                    level="3"
                />
                <BodyLong>
                    <LocaleInlineLenke tekst={kvitteringTekster.kontakt_oss_innhold} />
                </BodyLong>
            </VStack>
            <VStack gap="4">
                <LocaleHeading tekst={kvitteringTekster.vilkår_tittel} size="medium" level="3" />
                <BodyLong>
                    <LocaleInlineLenke tekst={kvitteringTekster.vilkår_innhold} />
                </BodyLong>
            </VStack>
            <VStack gap="4">
                <LocaleHeading
                    tekst={kvitteringTekster.relevante_stønader_tittel}
                    level="3"
                    size="medium"
                />
                <BodyLong>
                    <LocaleInlineLenke tekst={kvitteringTekster.relevante_stønader_innhold} />
                </BodyLong>
            </VStack>
        </Container>
    );
};

export default Kvittering;
