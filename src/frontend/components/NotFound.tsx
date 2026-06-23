import { Box, VStack, Heading, BodyShort, Button } from '@navikt/ds-react';

import { Container } from './Side';

export const NotFound: React.FC = () => {
    return (
        <Container>
            <Box paddingBlock="space-80 space-64" data-aksel-template="404-v3">
                <VStack gap="space-48" align="start">
                    <VStack gap="space-16">
                        <Heading level="1" size="large">
                            Beklager, vi fant ikke siden
                        </Heading>
                        <BodyShort>
                            Denne siden kan være slettet eller flyttet, eller det er en feil i
                            lenken.
                        </BodyShort>
                    </VStack>
                    <Button onClick={() => window.history.back()}>Gå tilbake</Button>
                </VStack>
            </Box>
        </Container>
    );
};
