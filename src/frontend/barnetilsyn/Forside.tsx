import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router';

import {
    Accordion,
    Alert,
    BodyLong,
    Button,
    Heading,
    HStack,
    Label,
    VStack,
} from '@navikt/ds-react';

import { ERouteBarnetilsyn, RoutesBarnetilsyn } from './routing/routesBarnetilsyn';
import { forsideTekster } from './tekster/forside';
import { loggAccordionEvent, loggBesøk, loggSkjemaStartet } from '../api/analytics';
import BekreftelseCheckbox from '../components/BekreftelseCheckbox';
import { InfoPunktliste } from '../components/InfoPunktliste';
import { PellePanel } from '../components/PellePanel/PellePanel';
import { Container } from '../components/Side';
import { LocaleHeading } from '../components/Teksthåndtering/LocaleHeading';
import LocaleInlineLenke from '../components/Teksthåndtering/LocaleInlineLenke';
import { LocalePunktliste } from '../components/Teksthåndtering/LocalePunktliste';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { usePassAvBarnSøknad } from '../context/PassAvBarnSøknadContext';
import { usePerson } from '../context/PersonContext';
import { fellesTekster } from '../tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';
import { erSnartNyttSkoleår } from '../utils/datoUtils';
import { hentNesteRoute } from '../utils/routeUtils';

const Forside: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { harBekreftet, settHarBekreftet } = usePassAvBarnSøknad();
    const { person } = usePerson();

    const [skalViseFeilmelding, settSkalViseFeilmelding] = useState(false);

    useEffect(() => {
        const route = RoutesBarnetilsyn[0];
        loggBesøk(Stønadstype.BARNETILSYN, route.path, route.label);
    }, []);

    const startSøknad = () => {
        if (harBekreftet) {
            loggSkjemaStartet(Stønadstype.BARNETILSYN);
            const nesteRoute = hentNesteRoute(RoutesBarnetilsyn, location.pathname);
            navigate(nesteRoute.path);
        } else {
            settSkalViseFeilmelding(true);
        }
    };

    const loggAccordionÅpning = (skalÅpne: boolean, tittel: string) => {
        loggAccordionEvent(Stønadstype.BARNETILSYN, skalÅpne, tittel, ERouteBarnetilsyn.FORSIDE);
    };

    return (
        <Container>
            <PellePanel poster>
                <Label>
                    <LocaleTekst
                        tekst={forsideTekster.veileder_tittel}
                        argument0={person.fornavn}
                    />
                </Label>
                <LocaleTekstAvsnitt tekst={forsideTekster.veileder_innhold} />
            </PellePanel>
            {erSnartNyttSkoleår() && (
                <Alert variant="info">
                    <Heading size="small" spacing>
                        <LocaleTekst tekst={forsideTekster.mottatt_faktura_alert_tittel} />
                    </Heading>
                    <LocaleTekstAvsnitt tekst={forsideTekster.mottatt_faktura_alert_innhold} />
                </Alert>
            )}
            <div>
                <LocaleHeading tekst={forsideTekster.viktig_å_vite_tittel} level="2" size="small" />
                <LocalePunktliste innhold={forsideTekster.viktig_å_vite_innhold} />
            </div>
            <Accordion>
                <Accordion.Item
                    onOpenChange={(skalÅpne) =>
                        loggAccordionÅpning(skalÅpne, 'Hvilke utgifter dekker vi?')
                    }
                >
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.utgifter_som_dekkes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <LocaleTekstAvsnitt tekst={forsideTekster.utgifter_som_dekkes_innhold} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item
                    onOpenChange={(skalÅpne) =>
                        loggAccordionÅpning(skalÅpne, 'Dokumentasjon av utgifter')
                    }
                >
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.dokumentasjon_utgifter_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <InfoPunktliste liste={forsideTekster.dokumentasjon_utgifter_punktlister} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item
                    onOpenChange={(skalÅpne) =>
                        loggAccordionÅpning(skalÅpne, 'Informasjon vi henter')
                    }
                >
                    <Accordion.Header>
                        <LocaleTekst tekst={forsideTekster.info_som_hentes_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <InfoPunktliste
                            liste={forsideTekster.info_som_hentes_punktlister}
                            spacingBottom
                        />
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
                    oppdaterHarBekreftet={(harBekreftet) => settHarBekreftet(harBekreftet)}
                    fjernFeilmelding={() => settSkalViseFeilmelding(false)}
                />
                <HStack justify={'center'}>
                    <Button onClick={startSøknad} variant="primary">
                        Start søknad
                    </Button>
                </HStack>
            </VStack>
        </Container>
    );
};

export default Forside;
