import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {
    Accordion,
    BodyLong,
    BodyShort,
    Button,
    GuidePanel,
    HStack,
    VStack,
} from '@navikt/ds-react';

import { routesReiseOppstartAvslutningHjemreise } from './routing/routesReiseOppstartAvslutningHjemreise';
import { forsideTekster } from './tekster/forside';
import { loggBesøk, loggSkjemaStartet } from '../api/analytics';
import { AdvarselEndringOvergangsstønad } from '../components/AdvarselEndringOvergangsstønad';
import { BekreftelseCheckbox } from '../components/BekreftelseCheckbox';
import { InfoPunktliste } from '../components/InfoPunktliste';
import { Container } from '../components/Side';
import { useReiseOppstartAvslutningHjemreiseSøknad } from './context/ReiseOppstartAvslutningHjemreiseSøknadContext';
import { LocaleHeading } from '../components/Teksthåndtering/LocaleHeading';
import { LocaleInlineLenke } from '../components/Teksthåndtering/LocaleInlineLenke';
import { LocalePunktliste } from '../components/Teksthåndtering/LocalePunktliste';
import { LocaleTekst } from '../components/Teksthåndtering/LocaleTekst';
import { LocaleTekstAvsnitt } from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { fellesTekster } from '../tekster/felles';
import { Skjematype } from '../typer/skjematyper';
import { hentNesteRoute } from '../utils/routeUtils';

export const Forside: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { harBekreftet, settHarBekreftet } = useReiseOppstartAvslutningHjemreiseSøknad();
    const [skalViseFeilmelding, settSkalViseFeilmelding] = useState(false);

    useEffect(() => {
        const route = routesReiseOppstartAvslutningHjemreise[0];
        loggBesøk(Skjematype.SØKNAD_REISE_OPPSTART_AVSLUTNING_HJEMREISE, route.path, route.label);
    }, []);

    const startSøknad = () => {
        if (!harBekreftet) {
            settSkalViseFeilmelding(true);
            return;
        }

        loggSkjemaStartet(Skjematype.SØKNAD_REISE_OPPSTART_AVSLUTNING_HJEMREISE);
        const nesteRoute = hentNesteRoute(
            routesReiseOppstartAvslutningHjemreise,
            location.pathname
        );
        navigate(nesteRoute.path);
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
                    <LocaleTekst tekst={forsideTekster.veileder_innhold} />
                </BodyShort>
            </GuidePanel>
            <AdvarselEndringOvergangsstønad />
            <div>
                <LocaleHeading tekst={forsideTekster.for_du_soker_tittel} level="2" size="small" />
                <LocalePunktliste innhold={forsideTekster.for_du_soker_innhold} />
            </div>
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.utgifter_som_dekkes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <LocaleTekstAvsnitt tekst={forsideTekster.utgifter_som_dekkes_innhold} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.info_som_hentes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <InfoPunktliste liste={forsideTekster.info_som_hentes_innhold} />
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
