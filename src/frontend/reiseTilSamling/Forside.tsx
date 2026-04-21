import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    Accordion,
    Box,
    BodyLong,
    BodyShort,
    Button,
    GuidePanel,
    HStack,
    VStack,
} from '@navikt/ds-react';

import { RouteTilPath } from './routing/routesReiseTilSamling';
import { forsideTekster } from './tekster/forside';
import BekreftelseCheckbox from '../components/BekreftelseCheckbox';
import { InfoPunktliste } from '../components/InfoPunktliste';
import { Container } from '../components/Side';
import { LocaleHeading } from '../components/Teksthåndtering/LocaleHeading';
import LocaleInlineLenke from '../components/Teksthåndtering/LocaleInlineLenke';
import { LocalePunktliste } from '../components/Teksthåndtering/LocalePunktliste';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import { fellesTekster } from '../tekster/felles';

export const Forside: React.FC = () => {
    const navigate = useNavigate();
    const [harBekreftet, settHarBekreftet] = useState(false);
    const [skalViseFeilmelding, settSkalViseFeilmelding] = useState(false);

    const startSøknad = () => {
        if (!harBekreftet) {
            settSkalViseFeilmelding(true);
            return;
        }

        navigate(RouteTilPath.PLACEHOLDER);
    };

    return (
        <Container>
            <GuidePanel poster>
                <BodyShort spacing>
                    <strong>
                        <LocaleTekst tekst={forsideTekster.veileder_tittel} />
                    </strong>
                </BodyShort>
                <BodyShort spacing>
                    <strong>
                        <LocaleTekst tekst={forsideTekster.veileder_innhold_tittel} />
                    </strong>
                </BodyShort>
                <LocalePunktliste innhold={forsideTekster.veileder_innhold_punkter} />
                <BodyShort spacing>
                    <LocaleTekst tekst={forsideTekster.veileder_innhold_mellomtekst} />
                </BodyShort>
                <LocalePunktliste innhold={forsideTekster.veileder_innhold_fortsettelse_punkter} />
            </GuidePanel>
            <div>
                <LocaleHeading
                    tekst={forsideTekster.kan_soke_tittel}
                    level="2"
                    size="large"
                    spacing
                />
                <LocalePunktliste innhold={forsideTekster.kan_soke_innhold} />
                <Box paddingBlock="space-16">
                    <LocaleHeading
                        tekst={forsideTekster.kan_ikke_soke_tittel}
                        level="3"
                        size="small"
                        spacing
                    />
                    <BodyLong>
                        <LocaleInlineLenke tekst={forsideTekster.kan_ikke_soke_tekst} />
                    </BodyLong>
                </Box>
            </div>
            <div>
                <LocaleHeading
                    tekst={forsideTekster.for_du_soker_tittel}
                    level="2"
                    size="large"
                    spacing
                />
                <LocalePunktliste innhold={forsideTekster.for_du_soker_innhold} />
            </div>
            <div>
                <LocaleHeading
                    tekst={forsideTekster.var_klar_over_tittel}
                    level="2"
                    size="large"
                    spacing
                />
                <LocalePunktliste innhold={forsideTekster.var_klar_over_innhold} />
            </div>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.info_som_hentes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <InfoPunktliste liste={forsideTekster.info_som_hentes_punktlister} />
                        <LocaleInlineLenke tekst={forsideTekster.info_som_hentes_personvern} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
            <VStack>
                <BodyLong>
                    <LocaleInlineLenke tekst={fellesTekster.viktig_med_rett_opplysninger} />
                </BodyLong>
                <BekreftelseCheckbox
                    skalViseFeilmelding={skalViseFeilmelding}
                    harBekreftet={harBekreftet}
                    oppdaterHarBekreftet={settHarBekreftet}
                    fjernFeilmelding={() => settSkalViseFeilmelding(false)}
                />
                <HStack justify="center">
                    <Button onClick={startSøknad} variant="primary">
                        Start søknad
                    </Button>
                </HStack>
            </VStack>
        </Container>
    );
};
