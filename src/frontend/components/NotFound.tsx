import { Box, VStack, Heading, BodyShort, Page, Link } from '@navikt/ds-react';

export const NotFound: React.FC = () => {
    return (
        <Page.Block as="main" width="xl" gutters>
            <Box paddingBlock="space-80 space-64" data-aksel-template="404-v3">
                <VStack gap="space-16">
                    <Heading level="1" size="large">
                        Beklager, vi fant ikke siden
                    </Heading>
                    <BodyShort>
                        Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
                    </BodyShort>
                    <BodyShort>
                        Søknadsskjemaer for tilleggsstønader kan du finne på {` `}
                        <Link href="https://www.nav.no/tilleggsstonader" inlineText>
                            nav.no/tilleggsstonader
                        </Link>
                        .
                    </BodyShort>
                </VStack>
            </Box>
        </Page.Block>
    );
};
