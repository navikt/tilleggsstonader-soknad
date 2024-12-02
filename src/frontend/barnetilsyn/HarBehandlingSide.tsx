import React, { useEffect } from 'react';

import { styled } from 'styled-components';

import { ChevronRightIcon, MultiplyIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, BodyShort, Button, Heading, VStack } from '@navikt/ds-react';

import { RoutesBarnetilsyn } from './routing/routesBarnetilsyn';
import { loggBesøkBarnetilsyn } from '../api/amplitude';
import { Container } from '../components/Side';
import LocaleInlineLenke from '../components/Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import { harEksisterendeBehandlingTekster } from '../tekster/harEksisterendeBehandling';
import { kvitteringTekster } from '../tekster/kvittering';
import { Stønadstype } from '../typer/stønadstyper';

const KnappeContainer = styled(BodyShort)`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

interface SøknadsideProps {
    startSøknad: () => void;
    stonadstype: Stønadstype;
}

const HarBehandlingSide: React.FC<SøknadsideProps> = ({
    startSøknad,
    stonadstype,
}: SøknadsideProps) => {
    useEffect(() => {
        if (stonadstype === Stønadstype.BARNETILSYN) {
            const route = RoutesBarnetilsyn[0];
            loggBesøkBarnetilsyn(route.path, route.label);
        } else if (stonadstype === Stønadstype.LÆREMIDLER) {
            const route = RoutesBarnetilsyn[0];
            loggBesøkBarnetilsyn(route.path, route.label);
        }
    }, [stonadstype]);

    return (
        <Container>
            <VStack gap="4">
                <Alert variant="info">
                    <Heading size="medium">
                        <LocaleTekst
                            tekst={
                                stonadstype === Stønadstype.BARNETILSYN
                                    ? harEksisterendeBehandlingTekster.alert_for_barnetilsyn
                                    : harEksisterendeBehandlingTekster.alert_for_læremidler
                            }
                        />
                        <BodyLong>
                            <LocaleInlineLenke
                                tekst={harEksisterendeBehandlingTekster.alert_innhold}
                            />
                        </BodyLong>
                    </Heading>
                </Alert>
            </VStack>
            <VStack gap="4">
                <Heading size="medium">
                    <LocaleTekst tekst={harEksisterendeBehandlingTekster.spørsmål_om_søknaden} />
                </Heading>
                <BodyLong>
                    <LocaleInlineLenke
                        tekst={harEksisterendeBehandlingTekster.spørsmål_om_søknaden_innhold}
                    />
                </BodyLong>
                <BodyLong>
                    <LocaleInlineLenke tekst={kvitteringTekster.kontakt_oss_innhold} />
                </BodyLong>
            </VStack>
            <VStack gap="4">
                <Heading size="medium">
                    <LocaleTekst
                        tekst={harEksisterendeBehandlingTekster.vil_forstatt_sende_søknad}
                    />
                </Heading>
                <BodyLong>
                    <LocaleTekst
                        tekst={harEksisterendeBehandlingTekster.vil_forstatt_sende_søknad_innhold}
                    />
                </BodyLong>
            </VStack>
            <KnappeContainer>
                <Button variant="secondary">
                    <MultiplyIcon
                        title="a11y-title"
                        fontSize="1.5rem"
                        style={{ verticalAlign: 'middle' }}
                    />
                    Avslutt
                </Button>
                <Button onClick={startSøknad} variant="primary">
                    Start ny søknad
                    <ChevronRightIcon
                        title="a11y-title"
                        fontSize="1.5rem"
                        style={{ verticalAlign: 'middle' }}
                    />
                </Button>
            </KnappeContainer>
            <LocaleInlineLenke tekst={harEksisterendeBehandlingTekster.minside} />
        </Container>
    );
};

export default HarBehandlingSide;
