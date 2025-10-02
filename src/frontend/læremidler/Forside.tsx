import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router';

import { Accordion, BodyLong, Button, GuidePanel, HStack, Label, VStack } from '@navikt/ds-react';

import { ERouteLæremidler, routesLæremidler } from './routing/routesLæremidler';
import { forsideTekster } from './tekster/forside';
import { loggAccordionEvent, loggBesøk, loggSkjemaStartet } from '../api/analytics';
import BekreftelseCheckbox from '../components/BekreftelseCheckbox';
import { InfoPunktliste } from '../components/InfoPunktliste';
import { Container } from '../components/Side';
import { LocaleHeading } from '../components/Teksthåndtering/LocaleHeading';
import LocaleInlineLenke from '../components/Teksthåndtering/LocaleInlineLenke';
import { LocalePunktliste } from '../components/Teksthåndtering/LocalePunktliste';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useLæremidlerSøknad } from '../context/LæremiddelSøknadContext';
import { usePerson } from '../context/PersonContext';
import { fellesTekster } from '../tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';
import { hentNesteRoute } from '../utils/routeUtils';

const Forside: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { harBekreftet, settHarBekreftet } = useLæremidlerSøknad();
    const { person } = usePerson();

    const [skalViseFeilmelding, settSkalViseFeilmelding] = useState(false);

    useEffect(() => {
        const route = routesLæremidler[0];
        loggBesøk(Stønadstype.LÆREMIDLER, route.path, route.label);
    }, []);

    const startSøknad = () => {
        if (harBekreftet) {
            loggSkjemaStartet(Stønadstype.LÆREMIDLER);
            const nesteRoute = hentNesteRoute(routesLæremidler, location.pathname);
            navigate(nesteRoute.path);
        } else {
            settSkalViseFeilmelding(true);
        }
    };

    const loggAccordionÅpning = (skalÅpne: boolean, tittel: string) => {
        loggAccordionEvent(Stønadstype.LÆREMIDLER, skalÅpne, tittel, ERouteLæremidler.FORSIDE);
    };

    return (
        <Container>
            <GuidePanel poster>
                <Label>
                    <LocaleTekst
                        tekst={forsideTekster.veileder_tittel}
                        argument0={person.fornavn}
                    />
                </Label>
                <LocaleTekstAvsnitt tekst={forsideTekster.veileder_innhold} />
            </GuidePanel>
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
                        <LocaleTekst tekst={forsideTekster.mengde_støtte_tittel} />
                    </Accordion.Header>
                    <Accordion.Content>
                        <BodyLong spacing>
                            <LocaleInlineLenke tekst={forsideTekster.mengde_støtte_innhold1} />
                        </BodyLong>
                        <BodyLong>
                            <LocaleTekst tekst={forsideTekster.mengde_støtte_innhold2} />
                        </BodyLong>
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
