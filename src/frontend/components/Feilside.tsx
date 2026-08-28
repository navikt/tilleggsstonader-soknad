import { BodyShort, Box, Button, Heading, Page, VStack } from '@navikt/ds-react';

export const Feilside: React.FC = () => {
    return (
        <Page.Block as="div" width="xl" gutters>
            <Box paddingBlock="space-80 space-64">
                <VStack gap="space-16" align="start">
                    <Heading level="1" size="large">
                        Beklager, noe gikk galt
                    </Heading>
                    <BodyShort>
                        Det oppstod en teknisk feil. Dette kan skyldes at systemet er midlertidig
                        utilgjengelig.
                    </BodyShort>
                    <BodyShort>
                        Prøv å laste inn siden på nytt. Hvis problemet vedvarer, prøv igjen senere.
                    </BodyShort>
                    <Button onClick={() => window.location.reload()}>Last inn siden på nytt</Button>
                </VStack>
            </Box>
        </Page.Block>
    );
};
