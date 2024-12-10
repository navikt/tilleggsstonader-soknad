import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router';
import { styled } from 'styled-components';

import { Accordion, BodyLong, BodyShort, Button, Label, VStack } from '@navikt/ds-react';

import { ERouteLæremidler, routesLæremidler } from './routing/routesLæremidler';
import { forsideTekster } from './tekster/forside';
import { loggAccordionEvent, loggBesøkLæremiddel, loggSkjemaStartet } from '../api/amplitude';
import BekreftelseCheckbox from '../components/BekreftelseCheckbox';
import { PellePanel } from '../components/PellePanel/PellePanel';
import { Container } from '../components/Side';
import LocaleInlineLenke from '../components/Teksthåndtering/LocaleInlineLenke';
import LocalePunktliste from '../components/Teksthåndtering/LocalePunktliste';
import LocaleTekst from '../components/Teksthåndtering/LocaleTekst';
import LocaleTekstAvsnitt from '../components/Teksthåndtering/LocaleTekstAvsnitt';
import { useLæremidlerSøknad } from '../context/LæremiddelSøknadContext';
import { usePerson } from '../context/PersonContext';
import { fellesTekster } from '../tekster/felles';
import { Stønadstype } from '../typer/stønadstyper';
import { hentNesteRoute } from '../utils/routes';

const KnappeContainer = styled(BodyShort)`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

const Forside: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { harBekreftet, settHarBekreftet } = useLæremidlerSøknad();
    const { person } = usePerson();

    const [skalViseFeilmelding, settSkalViseFeilmelding] = useState(false);

    useEffect(() => {
        const route = routesLæremidler[0];
        loggBesøkLæremiddel(route.path, route.label);
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
            <PellePanel poster>
                <Label>
                    <LocaleTekst
                        tekst={forsideTekster.veileder_tittel}
                        argument0={person.fornavn}
                    />
                </Label>
                <LocaleTekstAvsnitt tekst={forsideTekster.veileder_innhold} />
            </PellePanel>
            <LocalePunktliste
                tittel={forsideTekster.viktig_å_vite_tittel}
                innhold={forsideTekster.viktig_å_vite_innhold}
            />
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
                        <LocalePunktliste
                            tittel={forsideTekster.info_som_hentes_innhold1}
                            innhold={forsideTekster.info_som_hentes_innhold2}
                            tittelSomLabel
                        />
                        <LocalePunktliste
                            tittel={forsideTekster.info_som_hentes_innhold3}
                            innhold={forsideTekster.info_som_hentes_innhold4}
                            tittelSomLabel
                        />
                        <LocaleInlineLenke tekst={forsideTekster.info_som_hentes_innhold5} />
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
                <KnappeContainer>
                    <Button onClick={startSøknad} variant="primary">
                        Start søknad
                    </Button>
                </KnappeContainer>
            </VStack>
        </Container>
    );
};

export default Forside;
