import React from 'react';

import { ChevronRightIcon, MultiplyIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button, Heading, HStack, VStack } from '@navikt/ds-react';

import Environment from '../api/Environment';
import { Container } from '../components/Side';
import LocaleInlineLenke from '../components/Teksthåndtering/LocaleInlineLenke';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import { fellesTekster } from '../tekster/felles';
import { harEksisterendeBehandlingTekster } from '../tekster/harEksisterendeBehandling';
import { kvitteringTekster } from '../tekster/kvittering';
import { stønadstypeTilSkjemanavn } from '../typer/skjemanavn';
import { Stønadstype } from '../typer/stønadstyper';

interface SøknadsideProps {
    startSøknad: () => void;
    stønadstype: Stønadstype;
}

const HarBehandlingSide: React.FC<SøknadsideProps> = ({
    startSøknad,
    stønadstype,
}: SøknadsideProps) => {
    const loggUt = () => {
        window.location.href = Environment().logoutUrl;
    };

    return (
        <Container>
            <VStack gap="4">
                <Alert variant="info">
                    <Heading size="medium">
                        <LocaleTekst
                            tekst={harEksisterendeBehandlingTekster.alert_for_stønadstype}
                            argument0={stønadstypeTilSkjemanavn[stønadstype].toLowerCase()}
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
                        tekst={
                            harEksisterendeBehandlingTekster.vil_forstatt_sende_søknad_innhold[
                                stønadstype
                            ]
                        }
                    />
                </BodyLong>
            </VStack>
            <HStack gap={'4'} justify="start">
                <Button variant="secondary" onClick={loggUt} icon={<MultiplyIcon />}>
                    <LocaleTekst tekst={fellesTekster.avsluttOgLoggUt} />
                </Button>
                <Button onClick={startSøknad} variant="primary" icon={<ChevronRightIcon />}>
                    <LocaleTekst tekst={harEksisterendeBehandlingTekster.startNySøknad} />
                </Button>
            </HStack>
        </Container>
    );
};

export default HarBehandlingSide;
